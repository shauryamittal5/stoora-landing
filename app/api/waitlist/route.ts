import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import os from "os";

export const runtime = "nodejs";

// A signup is valid if it looks like an email OR an Indian mobile / general phone number.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function classifyContact(raw: string): { kind: "email" | "phone"; value: string } | null {
  const value = raw.trim();
  if (!value) return null;
  if (EMAIL_RE.test(value)) return { kind: "email", value };
  const digits = value.replace(/[\s\-()+]/g, "");
  // Accept 10-digit Indian mobiles, optionally with 91 / 0 prefix, up to 15 digits (E.164 max).
  if (/^\d{10,15}$/.test(digits)) return { kind: "phone", value };
  return null;
}

async function saveLocally(entry: Record<string, unknown>) {
  // On serverless hosts (e.g. Vercel) the project directory is read-only; only the
  // system temp dir is writable. Use it there so a missing WAITLIST_SHEET_URL degrades
  // gracefully instead of throwing a 500. NOTE: temp storage is ephemeral — configure
  // WAITLIST_SHEET_URL in production so signups land somewhere durable.
  const base = process.env.VERCEL || process.env.NODE_ENV === "production" ? os.tmpdir() : process.cwd();
  const dir = path.join(base, ".data");
  await fs.mkdir(dir, { recursive: true });
  await fs.appendFile(path.join(dir, "waitlist.jsonl"), JSON.stringify(entry) + "\n", "utf8");
}

export async function POST(request: Request) {
  let body: { contact?: string; source?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const contact = classifyContact(String(body.contact ?? ""));
  if (!contact) {
    return NextResponse.json(
      { ok: false, error: "Enter a valid email or phone number." },
      { status: 422 },
    );
  }

  const entry = {
    contact: contact.value,
    kind: contact.kind,
    source: typeof body.source === "string" ? body.source.slice(0, 40) : "unknown",
    createdAt: new Date().toISOString(),
  };

  const sheetUrl = process.env.WAITLIST_SHEET_URL;

  // Preferred path: forward to the Google Apps Script web app backing a Google Sheet.
  if (sheetUrl) {
    try {
      const res = await fetch(sheetUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
      if (!res.ok) throw new Error(`Sheet responded ${res.status}`);
      return NextResponse.json({ ok: true });
    } catch (err) {
      // Don't lose the lead if the sheet is unreachable — keep a local copy and log it.
      console.error("[waitlist] sheet forward failed:", err);
      try {
        await saveLocally({ ...entry, sheetError: true });
      } catch (fsErr) {
        console.error("[waitlist] local fallback failed:", fsErr);
      }
      return NextResponse.json(
        { ok: false, error: "Something went wrong. Please try again." },
        { status: 502 },
      );
    }
  }

  // Dev / not-yet-configured fallback: append to .data/waitlist.jsonl so the form works out of the box.
  try {
    await saveLocally(entry);
    console.log("[waitlist] captured locally (WAITLIST_SHEET_URL not set):", entry);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[waitlist] local save failed:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
