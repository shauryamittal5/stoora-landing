import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Stoora",
  description: "The terms that apply to using the Stoora website and waitlist.",
};

export default function Terms() {
  return (
    <main className="legal-page">
      <a className="back-link" href="/">← Back to Stoora</a>
      <h1>Terms of Service</h1>
      <p className="updated">Last updated: 19 July 2026</p>

      <p className="legal-draft">
        ⚠️ Draft — please have this reviewed by a lawyer before launch. It covers the waitlist
        website only and is not legal advice.
      </p>

      <p>
        These terms apply to the Stoora website and waitlist. Stoora is a pre-launch product; the
        platform described on this site is not yet generally available.
      </p>

      <h2>The waitlist</h2>
      <p>
        Joining the waitlist reserves your interest in early access. It does not create a contract,
        guarantee a spot, or guarantee any specific price, feature or launch date. We onboard
        creators in small batches and will contact you when a spot is available.
      </p>

      <h2>Pricing</h2>
      <p>
        Any pricing shown on this site is indicative and may change before launch. Early waitlist
        members may receive free access and founding-member pricing, subject to the terms we share
        at onboarding.
      </p>

      <h2>Acceptable use</h2>
      <p>
        Please use this site lawfully and don&apos;t attempt to disrupt, misuse or gain unauthorised
        access to it.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms as we get closer to launch. Material changes will be reflected on
        this page.
      </p>

      <h2>Contact</h2>
      <p>
        Questions? Write to us at <a href="mailto:hello@stoora.in">hello@stoora.in</a>.
      </p>
    </main>
  );
}
