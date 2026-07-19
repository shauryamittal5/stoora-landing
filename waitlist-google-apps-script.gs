/**
 * Stoora waitlist → Google Sheet
 * -------------------------------------------------------------
 * Receives POSTs from the landing page's /api/waitlist route and
 * appends one row per signup to the bound Google Sheet.
 *
 * SETUP (2 minutes):
 *  1. Create a Google Sheet. Optional: put these headers in row 1 —
 *     createdAt | contact | kind | source
 *  2. Extensions → Apps Script. Delete any code, paste this file.
 *  3. Deploy → New deployment → type "Web app".
 *       - Execute as: Me
 *       - Who has access: Anyone
 *     Copy the "/exec" Web app URL.
 *  4. In the landing page project, set the env var:
 *       WAITLIST_SHEET_URL=<that /exec URL>
 *     (locally: .env.local ; on Vercel: Project → Settings → Env Vars)
 *  5. Redeploy the site. Done — signups now land in the Sheet.
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000); // avoid two signups clobbering the same row
  try {
    var data = {};
    try {
      data = JSON.parse(e.postData.contents);
    } catch (err) {
      data = e.parameter || {};
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // Write a header row once, if the sheet is empty.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["createdAt", "contact", "kind", "source"]);
    }

    sheet.appendRow([
      data.createdAt || new Date().toISOString(),
      data.contact || "",
      data.kind || "",
      data.source || "",
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Lets you sanity-check the deployment in a browser (should show "Stoora waitlist endpoint is live").
function doGet() {
  return ContentService.createTextOutput("Stoora waitlist endpoint is live");
}
