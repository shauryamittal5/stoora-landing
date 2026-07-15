import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stoora | Your AI business co-founder",
  description: "Turn your audience into a live business with Stoora.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
