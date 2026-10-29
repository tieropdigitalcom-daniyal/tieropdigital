"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const entrances = [
  ".reveal", ".page-intro h1", ".page-intro > p", ".intro-topline",
  ".project-card", ".expertise-card", ".studio-value", ".studio-editorial > *",
  ".contact-aside", ".contact-form-panel", ".project-callout", ".project-summary > *",
  ".project-next", ".legal-body > h2", ".contact-steps > div",
].join(",");
const surfaces = ".expertise-card,.process-step,.studio-value,.project-callout,.contact-form-panel,.service-row,.project-card-surface";

export function Effects() {
  const pathname = usePathname();
  const progress = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = matchMedia("(hover: hover) and (pointer: fine)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const observed = new WeakSet<Element>();
    const layers = new Map<HTMLElement, Animation | null>();
    const inView = new Set<HTMLElement>();
    const entrancesInFlight = new Set<Animation>();
    let frame = 0, pointerFrame = 0, refreshFrame = 0, range = 1;
    let tilt: HTMLElement | null = null;
    let tiltAnimation: Animation | null = null;
    let bounds: DOMRect | null = null;
    let x = 0, y = 0;
    const motion = () => !media.matches && !connection?.saveData;
    // WAAPI changes the presentation, never server-rendered classes or attributes.
    // This also works while independently streamed React sections hydrate.
    const transformFrame = (element: HTMLElement, transform: string, animation: Animation | null) => {
      const keyframes = [{ transform }, { transform }];
      if (animation) (animation.effect as KeyframeEffect | null)?.setKeyframes(keyframes);
      else { animation = element.animate(keyframes, { duration: 1, fill: "both" }); animation.pause(); animation.currentTime = 0; }
      return animation;
    };
    const update = () => {
      frame = 0;
      if (document.hidden) return;
      if (progress.current) progress.current.style.transform = `scaleX(${Math.min(1, Math.max(0, scrollY / range))})`;
      if (!motion()) return;
      const mobile = innerWidth <= 760 ? 0.55 : 1;
      // Batch reads before writes; only artwork near the viewport participates.
      const positions = [...inView].filter(layer => layer.isConnected).map(layer => {
        const rect = layer.getBoundingClientRect();
        return [layer, Math.max(-52, Math.min(52, (innerHeight / 2 - rect.top - rect.height / 2) * Number(layer.dataset.parallax) * mobile))] as const;
      });
      for (const [layer, offset] of positions) layers.set(layer, transformFrame(layer, `translate3d(0,${offset.toFixed(1)}px,0)`, layers.get(layer) ?? null));
    };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    const resize = () => { range = Math.max(1, document.documentElement.scrollHeight - innerHeight); bounds = null; scroll(); };
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        const element = entry.target as HTMLElement;
        if (motion()) {
          const index = element.parentElement?.matches(".service-catalog,.studio-values,.process-grid,.portfolio-collection") ? Array.prototype.indexOf.call(element.parentElement.children, element) : 0;
          const animation = element.animate([{ opacity: 0.05, translate: "0 22px" }, { opacity: 1, translate: "0 0" }], { duration: innerWidth <= 760 ? 480 : 620, delay: Math.min(index % 3, 2) * 60, easing: "cubic-bezier(.2,.7,.2,1)", fill: "backwards" });
          entrancesInFlight.add(animation);
          animation.onfinish = () => entrancesInFlight.delete(animation);
        }
        observer.unobserve(element);
      }
    }, { threshold: 0.06, rootMargin: "0px 0px 24px 0px" });
    const parallax = new IntersectionObserver(entries => {
      for (const entry of entries) {
        const layer = entry.target as HTMLElement;
        if (entry.isIntersecting) inView.add(layer); else inView.delete(layer);
      }
      scroll();
    }, { rootMargin: "80px" });
    const refresh = () => {
      refreshFrame = 0;
      document.querySelectorAll<HTMLElement>(entrances).forEach(element => {
        if (element.closest(".carousel-viewport") || observed.has(element)) return;
        observed.add(element); observer.observe(element);
      });
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach(layer => {
        if (!layers.has(layer)) { layers.set(layer, null); parallax.observe(layer); }
      });
      for (const [layer, animation] of layers) if (!layer.isConnected) { animation?.cancel(); parallax.unobserve(layer); layers.delete(layer); inView.delete(layer); }
      resize();
    };
    const resetTilt = () => { cancelAnimationFrame(pointerFrame); pointerFrame = 0; tiltAnimation?.cancel(); tiltAnimation = null; tilt = null; bounds = null; };
    const move = (event: PointerEvent) => {
      if (!motion() || !pointer.matches || event.pointerType === "touch") return;
      const target = (event.target as Element).closest<HTMLElement>(surfaces);
      if (target?.matches(":focus-within") && target.querySelector("input,textarea,select")) { resetTilt(); return; }
      if (target !== tilt) { resetTilt(); tilt = target; bounds = target?.getBoundingClientRect() ?? null; }
      if (!tilt) return;
      if (!bounds) bounds = tilt.getBoundingClientRect();
      x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
      y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
      if (!pointerFrame) pointerFrame = requestAnimationFrame(() => {
        pointerFrame = 0;
        if (tilt) tiltAnimation = transformFrame(tilt, `perspective(1100px) rotateX(${((0.5 - y) * 5).toFixed(2)}deg) rotateY(${((x - 0.5) * 6).toFixed(2)}deg)`, tiltAnimation);
      });
    };
    const leave = (event: PointerEvent) => { if (!event.relatedTarget) resetTilt(); };
    const preference = () => {
      if (!motion()) { resetTilt(); for (const animation of entrancesInFlight) animation.cancel(); entrancesInFlight.clear(); for (const [layer, animation] of layers) { animation?.cancel(); layers.set(layer, null); } }
      scroll();
    };
    const visibility = () => { if (document.hidden) { resetTilt(); for (const animation of entrancesInFlight) animation.pause(); } else { for (const animation of entrancesInFlight) animation.play(); scroll(); } };
    const mutation = new MutationObserver(records => { if (records.some(record => [...record.addedNodes].some(node => node.nodeType === 1)) && !refreshFrame) refreshFrame = requestAnimationFrame(refresh); });
    const size = new ResizeObserver(resize);
    refresh(); visibility(); size.observe(document.body); mutation.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("scroll", scroll, { passive: true }); window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("pointermove", move, { passive: true }); document.addEventListener("pointerout", leave, { passive: true });
    document.addEventListener("visibilitychange", visibility); media.addEventListener("change", preference); pointer.addEventListener("change", resetTilt);
    return () => {
      observer.disconnect(); parallax.disconnect(); mutation.disconnect(); size.disconnect();
      cancelAnimationFrame(frame); cancelAnimationFrame(refreshFrame); resetTilt();
      for (const animation of entrancesInFlight) animation.cancel(); for (const animation of layers.values()) animation?.cancel();
      window.removeEventListener("scroll", scroll); window.removeEventListener("resize", resize);
      document.removeEventListener("pointermove", move); document.removeEventListener("pointerout", leave);
      document.removeEventListener("visibilitychange", visibility); media.removeEventListener("change", preference); pointer.removeEventListener("change", resetTilt);
    };
  }, [pathname]);
  return <div className="reading-progress" ref={progress} aria-hidden="true" />;
}
