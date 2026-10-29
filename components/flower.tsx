"use client";
import { useEffect, useRef } from "react";
export function Flower() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const flower = root.current;
    if (!flower) return;
    let visible = false;
    const update = () => flower.classList.toggle("is-blooming", visible && !document.hidden);
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; update(); }, { rootMargin: "40px" });
    observer.observe(flower); document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);
  return <div className="flower-stage" ref={root} aria-hidden="true"><span className="flower-aura" /><span className="flower-orbit flower-orbit-one" /><span className="flower-orbit flower-orbit-two" /><img className="flower-bloom" src="/assets/chrome-bloom.svg" width="420" height="420" alt="" loading="lazy" decoding="async" /><span className="flower-shadow" /><span className="flower-point flower-point-one" /><span className="flower-point flower-point-two" /></div>;
}
