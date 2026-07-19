"use client";

import { FormEvent, useState } from "react";

const sell = [
  { word: "know", items: "Courses · 1:1 sessions · ebooks · templates" },
  { word: "make", items: "Crafts · apparel · art · home decor" },
  { word: "love", items: "Fitness classes · workshops · community nights" },
];

const features = [
  { label: "✦ 01 · The builder", title: "Launch a polished store from your content", text: "Share your Instagram or answer five questions. Stoora creates the storefront, brand voice, catalog, prices and checkout for you.", points: ["Live store link in about 5 minutes", "UPI, GPay, PhonePe and COD", "GST invoices generated automatically"], visual: "your content → live storefront" },
  { label: "✦ 02 · The product maker", title: "Turn what you know into something people can buy", text: "Your reels, FAQs and lessons become sellable ebooks, courses, templates and consultation packages.", points: ["Fitness content becomes a 30-day plan", "A playlist becomes a mini-course", "FAQs become a paid guide"], visual: "your knowledge → sellable product" },
  { label: "✦ 03 · The growth engine", title: "Keep customers moving while you keep creating", text: "Stoora drafts campaigns and order updates in your voice. You approve them from WhatsApp and get back to the work that matters.", points: ["Abandoned-cart nudges", "Festival and launch campaigns", "WhatsApp-native order updates"], visual: "your voice → ready-to-send campaign" },
  { label: "✦ 04 · The payments layer", title: "Get paid the way India pays", text: "No global card gateway that fights your buyers. UPI-first checkout, cash on delivery and GST-ready invoices, built in from day one.", points: ["UPI, GPay, PhonePe and COD", "GST invoices on every order", "WhatsApp confirmations to both sides"], visual: "checkout → money in your account" },
];

const stats = [
  ["10M+", "Indian creators who could sell"],
  ["₹0", "to join — free for the first 500"],
  ["5 min", "from signup to a live link"],
];

const stories = [
  ["Fitness & Wellness", "Fitness creators", "Turn 60 Instagram reels into a ₹499 digital workout ebook — in minutes, not months."],
  ["Artisan & Crafts", "Artisans & makers", "Swap manual Instagram DM orders for automated UPI checkout and WhatsApp delivery tracking."],
  ["Coaching & Education", "Coaches & educators", "Turn old video lectures into a structured mini-course with instant digital access."],
];

const quotes = [
  ["“We built Stoora because Indian creators lose 40% of sales taking orders manually via Instagram DMs and Google Pay screenshots. Our AI handles cataloging, payments, and marketing in 5 minutes.”", "Shaurya", "Founder & CEO (ex-Hastakala Crafts)"],
  ["“Storefront, instant UPI checkout, GST invoices, and WhatsApp delivery alerts — built natively for India's 10M+ solo sellers and micro-entrepreneurs.”", "Shreya Bansal", "Co-Founder & CTO (BITS Pilani)"],
];

const faqs = [
  ["When does Stoora launch?", "We are onboarding the first 500 creators in small batches. Join the waitlist and we will message you on WhatsApp when your store is ready to launch."],
  ["What can I sell on Stoora?", "Physical products, digital downloads, e-books, courses, and bookable 1:1 sessions can all live seamlessly in the same store."],
  ["Do I need tech skills or coding?", "No. If you can post on Instagram, you can run a Stoora store. The AI builds your catalog, brand voice, and checkout automatically."],
  ["How do payments and GST work?", "Customers pay instantly via UPI (GPay, PhonePe, Paytm) or Cash on Delivery. GST-ready invoices and WhatsApp receipts are sent automatically."],
];

const footerCols = [
  { title: "Product", links: [["Store builder", "#features"], ["AI product maker", "#features"], ["Growth engine", "#features"], ["UPI payments", "#features"], ["WhatsApp orders", "#features"]] },
  { title: "Sell", links: [["Sell courses", "#sell"], ["Sell crafts & products", "#sell"], ["Sell digital downloads", "#sell"], ["Sell services & classes", "#sell"], ["Start an online business", "#waitlist"]] },
  { title: "Company", links: [["Pricing", "#pricing"], ["FAQ", "#faq"], ["Join the waitlist", "#waitlist"], ["hello@stoora.in", "mailto:hello@stoora.in"]] },
];

function Nav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <nav className={open ? "open" : ""}>
      <a className="logo" href="#top" onClick={close}>st<span>oo</span>ra<span>.</span>in</a>
      <button className="nav-toggle" type="button" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <span /><span /><span />
      </button>
      <div className="nav-links">
        <a href="#sell" onClick={close}>What you sell</a>
        <a href="#features" onClick={close}>Features</a>
        <a href="#team" onClick={close}>About Us</a>
        <a href="#pricing" onClick={close}>Pricing</a>
        <a className="button coral" href="#waitlist" onClick={close}>Join the waitlist</a>
      </div>
    </nav>
  );
}

function WaitlistForm({ source = "hero", variant = "inline" }: { source?: string; variant?: "inline" | "prompt" }) {
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = contact.trim();
    if (!value) { setError("Enter your email or WhatsApp number."); setStatus("error"); return; }
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact: value, source }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setStatus("done");
      setShowModal(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  const shareText = encodeURIComponent(
    "I just signed up for early access to Stoora — an AI co-founder that builds your complete online business in 5 minutes with UPI checkout! Join the waitlist here: https://stoora.in"
  );
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${shareText}`;

  if (status === "done" && !showModal) {
    return (
      <div className="success-banner" role="status">
        <p>🎉 <b>You&apos;re on the waitlist!</b> We&apos;ll send your invite on WhatsApp when your store is ready to build.</p>
        <button className="button dark" style={{ marginTop: 8 }} onClick={() => setShowModal(true)}>
          Skip the queue — invite friends →
        </button>
      </div>
    );
  }

  return (
    <>
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)} aria-label="Close">×</button>
            <div className="modal-icon">🚀</div>
            <h3>You&apos;re on the list! 🎉</h3>
            <p>We&apos;re onboarding India&apos;s first 500 creators in small batches. Want to move up the queue?</p>
            <div className="referral-box">
              <p><b>🎁 VIP Perk:</b> Invite 3 creator friends on WhatsApp to get <b>6 months free</b> + priority onboarding.</p>
              <a
                className="button coral whatsapp-share-btn"
                href={whatsappShareUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                📲 Share on WhatsApp to Skip Queue
              </a>
            </div>
          </div>
        </div>
      )}

      {variant === "prompt" ? (
        <form className="prompt-form" onSubmit={submit} noValidate>
          <span className="prompt-icon" aria-hidden>✦</span>
          <input
            name="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
            placeholder="Enter your email or WhatsApp number (+91)"
            aria-label="Email or WhatsApp number"
            aria-invalid={status === "error"}
            disabled={status === "loading"}
          />
          <button className="prompt-send" type="submit" aria-label="Join the waitlist" disabled={status === "loading"}>
            {status === "loading" ? "Joining…" : "Join the waitlist"}
          </button>
          {status === "error" && <p className="form-error" role="alert">{error}</p>}
        </form>
      ) : (
        <form className="wait-form" onSubmit={submit} noValidate>
          <input
            name="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
            placeholder="Email or WhatsApp number (+91)"
            aria-label="Email or WhatsApp number"
            aria-invalid={status === "error"}
            disabled={status === "loading"}
          />
          <button className="button coral" type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Joining…" : "Join the waitlist"}
          </button>
          {status === "error" && <p className="form-error" role="alert">{error}</p>}
        </form>
      )}
      <p className="privacy-guarantee">🔒 100% Privacy Guaranteed. Zero spam. 1-click WhatsApp onboarding when ready.</p>
    </>
  );
}

export default function Home() {
  return (
    <main>
      <Nav />

      <header className="hero" id="top">
        <p className="eyebrow">For India&apos;s creators, coaches and micro-sellers</p>
        <h1>Start your business<br /><em>in 5 minutes.</em></h1>
        <p className="hero-copy">An AI co-founder that builds your storefront, converts your reels into sellable products, and automates your WhatsApp growth.</p>
        <WaitlistForm source="hero" variant="prompt" />
        <p className="trust">Onboarding India&apos;s first <b>500 creators</b> · Free early access · No card needed</p>
        <div className="proof"><span>UPI-first</span><span>WhatsApp-native</span><span>GST-ready</span><span>Hindi + regional languages</span></div>
        <div className="demo-stage"><div className="stage-label">Stoora AI · live preview</div><div className="build-log"><b>Building your store</b><p>✓ Reading your content</p><p>✓ Writing your product pages</p><p>✓ Setting up UPI checkout</p><strong>● Live in 4m 52s</strong></div><div className="phone"><div className="phone-bar">stoora.in/riya.fit</div><div className="store-avatar">R</div><h3>Riya Fitness</h3><p>Home workouts for busy women</p><div className="product"><b>30-Day Home Workout</b><strong>₹499</strong></div><div className="product"><b>1:1 Diet Consultation</b><strong>₹999</strong></div><div className="pay-row"><span>UPI</span><span>GPay</span><span>COD</span></div></div></div>
      </header>

      <div className="ticker"><span>Stores you could build</span><b>riya.fit</b><b>meera.crafts</b><b>tarot.by.ash</b><b>chefkunal</b><b>guitar.gurukul</b></div>

      <section id="sell" className="sell">
        <div className="section-head"><p className="eyebrow">One store for everything</p><h2>Sell what you have, whatever it is.</h2></div>
        <div className="sell-rows">{sell.map((row) => <article className="sell-row" key={row.word}><h3>Sell what you <em>{row.word}</em></h3><p>{row.items}</p></article>)}</div>
      </section>

      <section id="features">
        <div className="section-head"><p className="eyebrow">One platform, four superpowers</p><h2>The AI team you could never afford to hire.</h2><p>Every part of the experience is designed to feel personal, even when you are busy making the next thing.</p></div>
        {features.map((feature, i) => <article className={`feature ${i % 2 ? "reverse" : ""}`} key={feature.label}><div><small>{feature.label}</small><h3>{feature.title}</h3><p>{feature.text}</p><ul>{feature.points.map(point => <li key={point}>{point}</li>)}</ul></div><div className="feature-visual"><span>stoora.ai</span><b>{feature.visual}</b><i>approved ✓</i></div></article>)}
      </section>

      <section className="statband">
        <div className="stat-grid">{stats.map(([n, label]) => <div key={label}><strong>{n}</strong><span>{label}</span></div>)}</div>
      </section>

      <section className="stories">
        <div className="section-head"><p className="eyebrow">What you&apos;ll build with Stoora</p><h2>Made for creators like you.</h2></div>
        <div className="story-grid">{stories.map(([tag, name, text]) => <article className="story-card" key={tag}><span className="story-tag">{tag}</span><div className="story-avatar" aria-hidden>★</div><h3>{name}</h3><p>{text}</p></article>)}</div>
      </section>

      <section id="team" className="team-section">
        <div className="section-head">
          <p className="eyebrow">Behind Stoora</p>
          <h2>Built by founders who digitized India&apos;s hardest sellers.</h2>
          <p>We built Hastakala Crafts to digitize traditional Indian artisans. Stoora extends that AI listing engine to every creator in India.</p>
        </div>
        <div className="team-grid">
          <article className="team-card">
            <div className="team-avatar">S</div>
            <h3>Shaurya</h3>
            <span className="team-role">Founder &amp; CEO</span>
            <p>1+ year building Hastakala Crafts (DPIIT-recognized marketplace). Onboarded India&apos;s least digital sellers &amp; built Bhavani, the AI listing engine.</p>
          </article>
          <article className="team-card">
            <div className="team-avatar">SB</div>
            <h3>Shreya Bansal</h3>
            <span className="team-role">Co-Founder &amp; CTO</span>
            <p>BITS Pilani alumnus. Architect of Stoora&apos;s core AI product engine and UPI-native payment rails.</p>
          </article>
        </div>
      </section>

      <section className="quotes">
        <div className="section-head"><p className="eyebrow">Founder Vision</p><h2>What drives us.</h2></div>
        <div className="quote-grid">{quotes.map(([text, name, role]) => <article className="quote-card" key={name}><p>{text}</p><b>{name}</b><span>{role}</span></article>)}</div>
      </section>

      <section className="light"><div className="section-head"><p className="eyebrow">Made for the way India buys</p><h2>A white-glove store without the white-glove bill.</h2></div><div className="pill-grid"><span>UPI checkout</span><span>Cash on delivery</span><span>GST invoices</span><span>WhatsApp updates</span><span>Regional languages</span></div></section>

      <section id="pricing"><div className="section-head"><p className="eyebrow">Pricing</p><h2>Priced like a chai subscription, not a software contract.</h2><p>Free while we onboard the first 500 creators. Join the waitlist now to lock in founding-member pricing — before plans go live.</p></div><div className="price-grid">{[["Basic", "₹299", "For your first sales"], ["Growth", "₹799", "For consistent sellers"], ["Business", "₹2,499", "For full-time brands"]].map((plan, i) => <article className={`price-card ${i === 1 ? "popular" : ""}`} key={plan[0]}>{i === 1 && <span className="tag">Most popular</span>}<h3>{plan[0]}</h3><p>{plan[2]}</p><strong>{plan[1]}<small>/month</small></strong><ul><li>AI-built store</li><li>UPI, COD and GST invoices</li><li>WhatsApp order alerts</li></ul><a className={`button ${i === 1 ? "coral" : "dark"}`} href="#waitlist">Join the waitlist</a></article>)}</div></section>

      <section id="faq" className="faq"><div className="section-head"><p className="eyebrow">FAQ</p><h2>Sawaal? Jawaab.</h2></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>

      <section className="final" id="waitlist"><p className="eyebrow">Start with your audience</p><h2>Life is too short<br /><em>to sell in DMs.</em></h2><p>Give your audience somewhere real to buy. Join the first 500 creators building their next chapter with Stoora.</p><WaitlistForm source="final" variant="prompt" /><p className="note">Founding-member pricing · Hand-held onboarding · Made in India</p></section>
      <footer className="site-footer">
        <div className="footer-bg" aria-hidden />
        <div className="footer-card">
          <div className="footer-top">
            <div className="footer-brand">
              <a className="logo" href="#top">st<span>oo</span>ra<span>.</span>in</a>
              <p className="footer-tag">Work for yourself.</p>
              <a className="button coral footer-start" href="#waitlist">Join the waitlist</a>
              <p className="footer-soon">iOS &amp; Android apps — coming soon</p>
            </div>
            <div className="footer-cols">
              {footerCols.map((col) => (
                <div className="footer-col" key={col.title}>
                  <h4>{col.title}</h4>
                  {col.links.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
                </div>
              ))}
            </div>
          </div>
          <div className="footer-base">
            <span>© 2026 Stoora · Made in India</span>
            <div className="footer-legal">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="mailto:hello@stoora.in">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
