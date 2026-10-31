"use client";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { EMAIL } from "@/lib/content";
import { Arrow } from "./icons";
const links = [{ href: "/", label: "Home" }, { href: "/work", label: "Work" }, { href: "/services", label: "Services" }, { href: "/about", label: "Studio" }, { href: "/team", label: "Team" }, { href: "/blog", label: "Insights" }];
export function Logo({ footer = false }: { footer?: boolean }) {
  return <Link prefetch={false} className={`brand ${footer ? "brand-footer" : ""}`} href="/" aria-label="Tierop Digital home"><img src="/assets/tierop-logo-384.webp" width="384" height="384" alt="TIEROP DIGITAL" decoding="async" /></Link>;
}
export function Header() {
  const pathname = usePathname(); const dialog = useRef<HTMLDialogElement>(null); const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    let previous = false;
    const update = () => { const scrolled = scrollY > 20; if (scrolled !== previous) { header.current?.classList.toggle("scrolled", scrolled); previous = scrolled; } };
    update(); window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  const close = () => { dialog.current?.close(); setOpen(false); };
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  useEffect(() => { dialog.current?.close(); }, [pathname]);
  return <><a className="skip-link" href="#main">Skip to content</a><header ref={header} className="site-header"><div className="header-inner shell"><Logo /><nav className="desktop-nav" aria-label="Main navigation">{links.map(link => <Link prefetch={false} key={link.href} href={link.href} aria-current={(link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)) ? "page" : undefined}>{link.label}<span className="nav-dot" /></Link>)}</nav><Link prefetch={false} className="header-cta" href="/contact">Let’s talk <Arrow /></Link><button className="menu-button" aria-label="Open navigation" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => { setOpen(true); dialog.current?.showModal(); }}><span /><span /></button></div></header><dialog ref={dialog} id="mobile-navigation" className="mobile-menu" onClose={() => setOpen(false)}><div className="mobile-menu-top"><Logo /><button className="close-menu" onClick={close} aria-label="Close navigation">×</button></div><nav aria-label="Mobile navigation">{[...links, { href: "/contact", label: "Let’s talk" }].map((link, i) => <Link prefetch={false} href={link.href} onClick={close} key={link.href}><span className="mono">0{i + 1}</span>{link.label}<Arrow /></Link>)}</nav><a className="menu-email" href={`mailto:${EMAIL}`}>{EMAIL}</a></dialog></>;
}
