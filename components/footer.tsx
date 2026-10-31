import Link from "next/link";
import { EMAIL, ALTERNATE_EMAIL, INSTAGRAM_URL, WHATSAPP_URL, WHATSAPP_NUMBER } from "@/lib/content";
import { Arrow, Spark, WhatsApp } from "./icons";
import { Logo } from "./header";
import { Flower } from "./flower";

export function Footer() {
  return <footer className="site-footer"><div className="shell">
    <div className="footer-invitation reveal"><div className="footer-invitation-copy"><span className="eyebrow"><Spark /> YOUR NEXT CHAPTER</span><Link prefetch={false} href="/contact" className="footer-title">Let’s make<br /><span>it different.</span><span className="footer-arrow"><Arrow /></span></Link><p className="footer-intro">A fresh idea. A thoughtful conversation.<br />Something extraordinary starts here.</p></div><div className="footer-sculpture"><Flower /><span className="eyebrow flower-caption">CREATIVITY IN FULL BLOOM.</span></div></div>
    <div className="footer-grid">
      <div className="footer-brand"><Logo footer /><div><p>Thoughtful design.<br />Distinctive digital experiences.</p><span className="footer-availability"><span className="status-dot" /> OPEN FOR COLLABORATIONS</span></div></div>
      <div className="footer-explore"><span className="eyebrow">EXPLORE</span><Link prefetch={false} href="/">Home</Link><Link prefetch={false} href="/work">Our work</Link><Link prefetch={false} href="/services">Expertise</Link><Link prefetch={false} href="/about">The studio</Link><Link prefetch={false} href="/contact">Start a project <Arrow /></Link></div>
      <div className="footer-contact"><span className="eyebrow">GOOD CONVERSATIONS START HERE</span><a className="email-link footer-primary-email" href={`mailto:${EMAIL}`}>{EMAIL}<Arrow /></a><a className="footer-whatsapp" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label={`Chat on WhatsApp at ${WHATSAPP_NUMBER} (opens in a new tab)`}><WhatsApp /><span><small>LET’S TALK ON WHATSAPP</small>{WHATSAPP_NUMBER}</span><Arrow /></a><a className="footer-alternate-email" href={`mailto:${ALTERNATE_EMAIL}`}>{ALTERNATE_EMAIL}</a><a className="instagram-link" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Tierop Digital on Instagram (opens in a new tab)"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".7" fill="currentColor" /></svg><span>@tieropdigital</span><Arrow /></a></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} TIEROP DIGITAL</span><span className="footer-note">Creativity with purpose.</span><div><Link prefetch={false} href="/privacy">Privacy</Link><Link prefetch={false} href="/terms">Terms</Link><a href="#top" className="back-top">Back to top ↑</a></div></div>
  </div></footer>;
}
