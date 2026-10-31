"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Arrow, WhatsApp } from "./icons";
import { EMAIL, WHATSAPP_URL, WHATSAPP_NUMBER } from "@/lib/content";

const loadInquiry = () => import("./contact-form").then(module => module.ContactForm);
const Inquiry = dynamic(loadInquiry, {
  ssr: false,
  loading: () => <p className="home-inquiry-loading" role="status">Preparing your project inquiry…</p>,
});

export function HomeInquiry() {
  const root = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    // Warm the form chunk during idle time, away from the services/flower transition.
    const idle = "requestIdleCallback" in window ? window.requestIdleCallback(() => { void loadInquiry(); }, { timeout: 4000 }) : null;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { setReady(true); observer.disconnect(); }
    }, { rootMargin: "900px" });
    if (root.current) observer.observe(root.current);
    return () => { observer.disconnect(); if (idle !== null) window.cancelIdleCallback(idle); };
  }, []);

  return <section ref={root} className="home-inquiry section" id="start-a-project" aria-labelledby="home-inquiry-title">
    <div className="shell">
      <div className="section-label"><span className="eyebrow">LET’S MAKE SOMETHING DIFFERENT</span><span className="mono muted">YOUR IDEA STARTS HERE.</span></div>
      <div className="home-inquiry-layout">
        <div className="home-inquiry-copy">
          <h2 id="home-inquiry-title">Your next<br />move<span>.</span></h2>
          <p>Seen something you like?<br />Tell us what you have in mind.</p>
          <a className="text-link" href={`mailto:${EMAIL}`}>{EMAIL}<Arrow /></a>
          <a className="home-inquiry-whatsapp" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"><WhatsApp /> {WHATSAPP_NUMBER}<Arrow /></a>
        </div>
        <div className="home-inquiry-form">{ready ? <Inquiry /> : <div className="home-inquiry-placeholder"><p>Let’s hear your idea.</p><a className="button button-outline" href="/contact">Send us a message <Arrow /></a></div>}</div>
      </div>
    </div>
  </section>;
}
