import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Stoora",
  description: "How Stoora collects, uses and protects your information.",
};

export default function Privacy() {
  return (
    <main className="legal-page">
      <a className="back-link" href="/">← Back to Stoora</a>
      <h1>Privacy Policy</h1>
      <p className="updated">Last updated: 19 July 2026</p>

      <p className="legal-draft">
        ⚠️ Draft — please have this reviewed by a lawyer before launch. It reflects Stoora&apos;s
        current data practices but is not legal advice.
      </p>

      <p>
        Stoora (&quot;we&quot;, &quot;us&quot;) is a pre-launch product for creators, coaches and
        micro-sellers in India. This policy explains what we collect when you join our waitlist and
        how we use it.
      </p>

      <h2>What we collect</h2>
      <p>
        When you join the waitlist, we collect the single contact detail you give us — either your
        email address <em>or</em> your WhatsApp / phone number — and the section of the page you
        signed up from. We do not ask for your name, payment details or any other personal
        information at this stage.
      </p>

      <h2>How we use it</h2>
      <ul>
        <li>To notify you on WhatsApp or email when early access is ready for you.</li>
        <li>To send you occasional updates about the launch. You can opt out at any time.</li>
        <li>To understand which parts of the page drive sign-ups, in aggregate.</li>
      </ul>

      <h2>How we store it</h2>
      <p>
        Waitlist entries are stored securely and are accessible only to the Stoora team. We do not
        sell, rent or share your contact information with third parties for their own marketing.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask us to show, correct or delete the information we hold about you at any time by
        emailing <a href="mailto:hello@stoora.in">hello@stoora.in</a>. We will respond promptly. We
        aim to align with India&apos;s Digital Personal Data Protection Act, 2023.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Write to us at{" "}
        <a href="mailto:hello@stoora.in">hello@stoora.in</a>.
      </p>
    </main>
  );
}
