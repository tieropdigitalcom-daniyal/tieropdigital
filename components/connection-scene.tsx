"use client";
import { useCallback, useEffect, useRef, useState } from "react";

type Phase = "ready" | "playing" | "settled";

/** A one-shot, image-based greeting; no continuous renderer or animation loop. */
export function ConnectionScene() {
  const root = useRef<HTMLElement>(null);
  const alive = useRef(false);
  const allowed = useRef(false);
  const started = useRef(false);
  const [phase, setPhase] = useState<Phase>("settled");
  const [paused, setPaused] = useState(false);
  const [canReplay, setCanReplay] = useState(false);

  const play = useCallback(async () => {
    if (!allowed.current || started.current || !root.current) return;
    started.current = true;
    // Decode the three cached layers before starting their shared timeline.
    await Promise.allSettled([...root.current.querySelectorAll("img")].map(image => image.decode()));
    if (alive.current && allowed.current) setPhase("playing");
  }, []);

  useEffect(() => {
    alive.current = true;
    const element = root.current;
    if (!element) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    let visible = false;
    const preference = () => {
      allowed.current = !reduced.matches && !connection?.saveData;
      setCanReplay(allowed.current);
      if (!allowed.current) { setPhase("settled"); started.current = true; }
    };
    preference();
    if (allowed.current) { setPhase("ready"); started.current = false; }
    const visibility = () => setPaused(document.hidden || !visible);
    const observer = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting && entries[0].intersectionRatio >= 0.25;
      visibility();
      if (visible) void play();
    }, { threshold: [0, 0.25] });
    observer.observe(element);
    document.addEventListener("visibilitychange", visibility);
    reduced.addEventListener("change", preference);
    return () => { alive.current = false; observer.disconnect(); document.removeEventListener("visibilitychange", visibility); reduced.removeEventListener("change", preference); };
  }, [play]);

  const replay = () => { if (phase !== "settled") return; started.current = false; setPhase("ready"); void play(); };

  return <section id="connection" className="connection-scene" ref={root} data-phase={phase} data-paused={paused} aria-label="Two 3D hands meet in a celebratory high-five and clasp">
    <div className="connection-atmosphere" aria-hidden="true" />
    <div className="connection-top shell"><span className="eyebrow">DESIGN × TECHNOLOGY × HUMAN EXPERIENCE</span><span className="mono">TIEROP DIGITAL</span></div>
    <div className="connection-stage" aria-hidden="true">
      <span className="connection-aura" />
      <div className="connection-hand connection-hand-left"><img src="/assets/connection-hand-1280.webp" srcSet="/assets/connection-hand-640.webp 640w, /assets/connection-hand-1280.webp 1280w" sizes="(max-width:760px) 75vw, 60vw" width="1280" height="720" alt="" loading="lazy" decoding="async" /></div>
      <div className="connection-hand connection-hand-right"><img src="/assets/connection-hand-1280.webp" srcSet="/assets/connection-hand-640.webp 640w, /assets/connection-hand-1280.webp 1280w" sizes="(max-width:760px) 75vw, 60vw" width="1280" height="720" alt="" loading="lazy" decoding="async" /></div>
      <picture className="connection-joined" onAnimationEnd={event => { if (event.animationName === "connection-lock") setPhase("settled"); }}><source media="(max-width:760px)" srcSet="/assets/connection-clasp-960.webp" /><img src="/assets/connection-clasp-1920.webp" width="1920" height="768" alt="" loading="lazy" decoding="async" /></picture>
      <span className="connection-impact" />
    </div>
    <div className="connection-bottom shell"><span className="eyebrow">CREATIVITY, WITH PURPOSE.</span>{canReplay && <button className="connection-replay" onClick={replay} disabled={phase !== "settled"} aria-label="Replay the 3D high-five animation"><span aria-hidden="true">↻</span> Replay</button>}<a className="connection-next" href="#expertise" aria-label="Continue to our expertise">↓</a></div>
  </section>;
}
