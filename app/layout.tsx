import type { Metadata } from "next";
import "./globals.css";

const OG_DESCRIPTION =
  "An AI co-founder that builds your store, turns your reels into sellable products, and runs your WhatsApp. Free early access for India's first 500 creators.";

// TODO: swap for a dedicated 1200×630 og.png; the collage is a functional interim.
const OG_IMAGE = {
  url: "/images/stoora-creator-collage.png",
  width: 1560,
  height: 1008,
  alt: "Stoora — the AI business co-founder for India's creators",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://stoora.in"),
  title: "Stoora | Start your business in 5 minutes",
  description:
    "Start your online business in 5 minutes. Stoora's AI builds your storefront, turns your reels into sellable products, and runs your WhatsApp — UPI, COD and GST-ready, built for India.",
  openGraph: {
    type: "website",
    url: "https://stoora.in",
    siteName: "Stoora",
    title: "Start your business in 5 minutes — Stoora",
    description: OG_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Start your business in 5 minutes — Stoora",
    description: OG_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
