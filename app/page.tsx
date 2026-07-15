"use client";

import { FormEvent, useState } from "react";

const features = [
  { label: "01 · The builder", title: "Launch a polished store from your content", text: "Share your Instagram or answer five questions. Stoora creates the storefront, brand voice, catalog, prices and checkout for you.", points: ["Live store link in about 10 minutes", "UPI, GPay, PhonePe and COD", "GST invoices generated automatically"] },
  { label: "02 · The product maker", title: "Turn what you know into something people can buy", text: "Your reels, FAQs and lessons become sellable ebooks, courses, templates and consultation packages.", points: ["Fitness content becomes a 30-day plan", "A playlist becomes a mini-course", "FAQs become a paid guide"] },
  { label: "03 · The growth engine", title: "Keep customers moving while you keep creating", text: "Stoora drafts campaigns and order updates in your voice. You approve them from WhatsApp and get back to the work that matters.", points: ["Abandoned-cart nudges", "Festival and launch campaigns", "WhatsApp-native order updates"] },
];

const faqs = [
  ["When does Stoora launch?", "We are onboarding the first 500 creators in small batches. Join the waitlist and we will message you when your store is ready to build."],
  ["What can I sell on Stoora?", "Physical products, digital downloads, courses and bookable services can all live in the same store."],
  ["Do I need tech skills?", "No. If you can post on Instagram, you can run a Stoora store. The AI builds everything and you review before sharing it."],
  ["How do payments work?", "Customers can pay by UPI or choose cash on delivery. GST-ready invoices and order updates are sent automatically."],
];

function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); };
  if (submitted) return <p className="success" role="status">You&apos;re on the list. We&apos;ll WhatsApp you when your store is ready.</p>;
  return <form className="wait-form" onSubmit={submit}><input name="contact" required placeholder="Email or WhatsApp number" aria-label="Email or WhatsApp number" /><button className="button coral" type="submit">Join the waitlist</button></form>;
}

export default function Home() {
  return (
    <main>
      <nav><a className="logo" href="#top">st<span>oo</span>ra<span>.</span>in</a><div className="nav-links"><a href="#how">How it works</a><a href="#features">Resources</a><a href="#pricing">Pricing</a><a href="#faq">FAQ</a></div><a className="button coral" href="#waitlist">Try for free</a></nav>

      <header className="hero" id="top">
        <p className="eyebrow">For India&apos;s creators, coaches and sellers</p>
        <h1>Your whole business.<br /><em>Built by AI.</em></h1>
        <p className="hero-copy">A dedicated AI co-founder for your store, products and growth. Go from audience to income without stitching five tools together.</p>
        <WaitlistForm />
        <p className="note">Free early access · No card needed</p>
        <div className="proof"><span>UPI-first</span><span>WhatsApp-native</span><span>GST-ready</span><span>Hindi + regional languages</span></div>
        <div className="demo-stage"><div className="stage-label">Stoora AI · live preview</div><div className="build-log"><b>Building your store</b><p>✓ Reading your content</p><p>✓ Writing your product pages</p><p>✓ Setting up UPI checkout</p><strong>● Live in 9m 41s</strong></div><div className="phone"><div className="phone-bar">stoora.in/riya.fit</div><div className="store-avatar">R</div><h3>Riya Fitness</h3><p>Home workouts for busy women</p><div className="product"><b>30-Day Home Workout</b><strong>₹499</strong></div><div className="product"><b>1:1 Diet Consultation</b><strong>₹999</strong></div><div className="pay-row"><span>UPI</span><span>GPay</span><span>COD</span></div></div></div>
      </header>

      <div className="ticker"><span>Live stores being built</span><b>riya.fit</b><b>meera.crafts</b><b>tarot.by.ash</b><b>chefkunal</b><b>guitar.gurukul</b></div>

      <section className="stats"><div><strong>60%</strong><span>fewer bad-fit sales calls</span></div><div><strong>20%</strong><span>more qualified leads</span></div><div><strong>24/7</strong><span>always-on customer guidance</span></div></section>

      <section id="how" className="band"><div className="section-head"><p className="eyebrow">How it works</p><h2>From Instagram to income in one sitting.</h2><p>Connect what you already have. Stoora turns it into a business that can sell while you sleep.</p></div><div className="step-grid">{["Share your Instagram", "Let Stoora build", "Approve and share", "Get paid to UPI"].map((step, i) => <article className="step" key={step}><small>0{i + 1}</small><h3>{step}</h3><p>{["Or answer five quick questions. That is all the setup there is.", "Branding, listings, copy and checkout assembled from your content.", "Drop your stoora.in link in your bio and on WhatsApp.", "Invoices, order alerts and payment records handled automatically."][i]}</p></article>)}</div></section>

      <section id="features"><div className="section-head"><p className="eyebrow">One platform, three agents</p><h2>Deploy help across your whole customer journey.</h2><p>Every part of the experience is designed to feel personal, even when you are busy making the next thing.</p></div>{features.map((feature, i) => <article className={`feature ${i % 2 ? "reverse" : ""}`} key={feature.label}><div><small>{feature.label}</small><h3>{feature.title}</h3><p>{feature.text}</p><ul>{feature.points.map(point => <li key={point}>{point}</li>)}</ul></div><div className="feature-visual"><span>stoora.ai</span><b>{i === 0 ? "your content → live storefront" : i === 1 ? "your knowledge → sellable product" : "your voice → ready-to-send campaign"}</b><i>approved ✓</i></div></article>)}</section>

      <section className="light"><div className="section-head"><p className="eyebrow">Made for the way India buys</p><h2>A white-glove store without the white-glove bill.</h2></div><div className="pill-grid"><span>UPI checkout</span><span>Cash on delivery</span><span>GST invoices</span><span>WhatsApp updates</span><span>Regional languages</span></div></section>

      <section id="pricing"><div className="section-head"><p className="eyebrow">Pricing</p><h2>Priced like a chai subscription, not a software contract.</h2></div><div className="price-grid">{[["Basic", "₹299", "For your first sales"], ["Growth", "₹799", "For consistent sellers"], ["Business", "₹2,499", "For full-time brands"]].map((plan, i) => <article className={`price-card ${i === 1 ? "popular" : ""}`} key={plan[0]}>{i === 1 && <span className="tag">Most popular</span>}<h3>{plan[0]}</h3><p>{plan[2]}</p><strong>{plan[1]}<small>/month</small></strong><ul><li>AI-built store</li><li>UPI, COD and GST invoices</li><li>WhatsApp order alerts</li></ul><a className={`button ${i === 1 ? "coral" : "dark"}`} href="#waitlist">Join the waitlist</a></article>)}</div></section>

      <section id="faq" className="faq"><div className="section-head"><p className="eyebrow">FAQ</p><h2>Sawaal? Jawaab.</h2></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>

      <section className="final" id="waitlist"><p className="eyebrow">Start with your audience</p><h2>Give them somewhere to buy.</h2><p>Join the first 500 creators building their next chapter with Stoora.</p><WaitlistForm /><p className="note">Founding-member pricing · Hand-held onboarding · Made in India</p></section>
      <footer><span>© 2026 Stoora</span><span>The AI business OS for India&apos;s creator economy</span><a href="mailto:hello@stoora.in">hello@stoora.in</a></footer>
    </main>
  );
}
