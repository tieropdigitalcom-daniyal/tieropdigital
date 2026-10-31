"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const entrances = [
  ".reveal", ".page-intro h1", ".page-intro > p", ".intro-topline",
  ".project-card", ".studio-value", ".studio-editorial > *",
  ".contact-aside", ".contact-form-panel", ".project-callout", ".project-summary > *",
  ".project-next", ".legal-body > h2", ".contact-steps > div",
].join(",");

/** One-shot compositor entrances. Scrolling and hovering need no JS render loop. */
export function Effects() {
  const pathname = usePathname();
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    const observed = new WeakSet<Element>();
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        if (reduced.matches || saveData) continue;
        const element = entry.target as HTMLElement;
        const siblings = element.parentElement;
        const index = siblings?.matches(".studio-values,.process-grid,.website-grid")
          ? Array.prototype.indexOf.call(siblings.children, element) : 0;
        const animation = element.animate([
          { opacity: 0, translate: "0 18px" },
          { opacity: 1, translate: "0 0" },
        ], { duration: 550, delay: Math.min(index % 3, 2) * 55, easing: "cubic-bezier(.22,1,.36,1)", fill: "backwards" });
        animations.add(animation);
        animation.onfinish = animation.oncancel = () => animations.delete(animation);
      }
    }, { threshold: 0, rootMargin: "0px 0px 32px 0px" });
    const observe = (element: Element) => {
      if (observed.has(element)) return;
      observed.add(element);
      observer.observe(element);
    };
    const scan = (root: Element) => {
      if (root.matches(entrances)) observe(root);
      root.querySelectorAll(entrances).forEach(observe);
    };
    // Observe just newly mounted subtrees (filtered projects / the lazy inquiry).
    const mutation = new MutationObserver(records => {
      for (const record of records) for (const node of record.addedNodes) {
        if (node instanceof Element) scan(node);
      }
    });
    const visibility = () => {
      document.body.classList.toggle("page-hidden", document.hidden);
      for (const animation of animations) document.hidden ? animation.pause() : animation.play();
    };
    const preference = () => {
      if (reduced.matches) for (const animation of animations) animation.cancel();
    };
    scan(document.body);
    mutation.observe(document.body, { childList: true, subtree: true });
    visibility();
    document.addEventListener("visibilitychange", visibility);
    reduced.addEventListener("change", preference);
    return () => {
      observer.disconnect(); mutation.disconnect();
      for (const animation of animations) animation.cancel();
      document.removeEventListener("visibilitychange", visibility);
      reduced.removeEventListener("change", preference);
    };
  }, [pathname]);
  return null;
}
