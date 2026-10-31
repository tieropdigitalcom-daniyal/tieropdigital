"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "./icons";

/** Rendered 3D art + compositor motion; no WebGL, canvas, or frame-by-frame JS. */
export function BloomWork() {
  const root = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    let visible = false;
    const sync = () => { section.dataset.running = String(visible && !document.hidden && !reduced.matches && !saveData); };
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); });
    observer.observe(section);
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", sync); reduced.removeEventListener("change", sync); };
  }, []);
  return <section ref={root} className="bloom-work" id="selected-work" data-running="false" data-paused={paused} aria-labelledby="see-work-title">
    <div className="shell bloom-topline"><span className="eyebrow">02 / SELECTED WORK</span><span className="mono">CREATIVITY, IN FULL BLOOM.</span></div>
    <div className="bloom-art" aria-hidden="true"><img src="/assets/neon-bloom.svg" width="3840" height="2160" alt="" loading="lazy" decoding="async" /></div>
    <div className="bloom-scrim" aria-hidden="true" />
    <div className="bloom-invitation shell"><p className="eyebrow">GOOD IDEAS DESERVE TO BE SEEN.</p><Link prefetch={false} href="/work" className="see-work-link"><h2 id="see-work-title">See <span>Work</span></h2><span className="see-work-arrow"><Arrow /></span></Link><span className="bloom-subtitle">A few possibilities, brought to life.</span></div>
    <div className="bloom-bottom shell"><span className="mono">DESIGNED TO FEEL DIFFERENT.</span><button type="button" className="bloom-motion" onClick={() => setPaused(value => !value)} aria-pressed={paused} aria-label={paused ? "Resume flower animation" : "Pause flower animation"}><span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>{paused ? "Play motion" : "Pause motion"}</button></div>
  </section>;
}
