"use client";
import { useEffect, useRef } from "react";
export function Portrait({ compact = false }: { compact?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = root.current;
    if (!host) return;
    const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const surface = host.closest("section") ?? host;
    let frame = 0;
    const reset = () => { cancelAnimationFrame(frame); frame = 0; host.style.removeProperty("--portrait-x"); host.style.removeProperty("--portrait-y"); host.style.removeProperty("--portrait-rx"); host.style.removeProperty("--portrait-ry"); };
    const move = (event: Event) => {
      if (!finePointer.matches || reduced.matches) return;
      const { clientX, clientY } = event as PointerEvent;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = host.getBoundingClientRect();
        host.style.setProperty("--portrait-x", `${((clientX - bounds.left) / bounds.width - .5) * 10}px`);
        host.style.setProperty("--portrait-y", `${((clientY - bounds.top) / bounds.height - .5) * 7}px`);
        host.style.setProperty("--portrait-rx", `${Math.max(-2, Math.min(2, (.5 - (clientY - bounds.top) / bounds.height) * 3))}deg`);
        host.style.setProperty("--portrait-ry", `${Math.max(-3, Math.min(3, ((clientX - bounds.left) / bounds.width - .5) * 4))}deg`);
        frame = 0;
      });
    };
    surface.addEventListener("pointermove", move, { passive: true }); surface.addEventListener("pointerleave", reset); reduced.addEventListener("change", reset);
    return () => { reset(); surface.removeEventListener("pointermove", move); surface.removeEventListener("pointerleave", reset); reduced.removeEventListener("change", reset); };
  }, []);
  return <div ref={root} className={`portrait ${compact ? "portrait-compact" : ""}`}><picture><source media="(max-width: 760px)" srcSet="/assets/hero-768.webp" /><img src="/assets/hero-1536.webp" width="1536" height="1024" alt="Original chrome portrait illuminated by cyan and magenta light" fetchPriority={compact ? "auto" : "high"} loading={compact ? "lazy" : "eager"} decoding="async" /></picture><span className="portrait-lustre" aria-hidden="true" /></div>;
}
