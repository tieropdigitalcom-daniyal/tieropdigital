"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { serviceCatalog, serviceCategories, type ServiceCategory } from "@/lib/content";
import { Arrow } from "./icons";
import { ServiceIcon } from "./service-icon";

export function ServiceFlights({ introduction = false, filters = false, detailed = true }: { introduction?: boolean; filters?: boolean; detailed?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const [category, setCategory] = useState<ServiceCategory>("All services");
  const visible = serviceCatalog.filter(service => category === "All services" || service.category === category);

  useEffect(() => {
    const host = root.current;
    if (!host) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        const element = entry.target as HTMLElement;
        if (!reduced.matches && !connection?.saveData) {
          const direction = element.dataset.flight === "left" ? -1 : 1;
          const animation = element.animate([
            { opacity: 0, transform: `translate3d(${direction * (innerWidth < 761 ? 58 : 110)}px,18px,0) rotate(${direction * 2}deg)` },
            { opacity: 1, transform: "translate3d(0,0,0) rotate(0deg)" },
          ], { duration: innerWidth < 761 ? 620 : 800, easing: "cubic-bezier(.16,1,.3,1)", fill: "backwards" });
          animations.add(animation); animation.onfinish = () => animations.delete(animation);
        }
        observer.unobserve(element);
      }
    }, { threshold: 0.12, rootMargin: "0px 0px -12px 0px" });
    host.querySelectorAll("[data-flight]").forEach(element => observer.observe(element));
    const preference = () => { if (reduced.matches) { for (const animation of animations) animation.cancel(); animations.clear(); } };
    const visibility = () => { for (const animation of animations) { if (document.hidden) animation.pause(); else animation.play(); } };
    reduced.addEventListener("change", preference); document.addEventListener("visibilitychange", visibility);
    return () => { observer.disconnect(); for (const animation of animations) animation.cancel(); reduced.removeEventListener("change", preference); document.removeEventListener("visibilitychange", visibility); };
  }, [category]);

  return <div ref={root} className={`service-flights ${detailed ? "is-detailed" : "is-compact"}`}>
    {introduction && <div className="service-flight-intro">
      <div className="section-label"><span className="eyebrow">01 / OUR EXPERTISE</span><span className="mono">CREATIVITY, WITH PURPOSE.</span></div>
      <h2 data-flight="left">WHAT WE DO<span>.</span></h2>
      <p className="service-flight-statement"><span data-flight="right">We connect <span className="type-outline">design</span>, technology</span><span data-flight="left">and <span className="type-outline">creative thinking</span> to bring</span><strong data-flight="right">your next idea to life.</strong></p>
    </div>}
    {filters && <div className="flight-filterbar"><div className="catalog-filters" role="group" aria-label="Filter services">{serviceCategories.map(item => <button key={item} className="filter-button" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}{item === "All services" && <span>11</span>}</button>)}</div><span className="catalog-count mono" role="status" aria-live="polite">{String(visible.length).padStart(2, "0")} SERVICES</span></div>}
    <div className="service-flight-grid">{visible.map((service, index) => <article className="service-flight-entry" data-flight={index % 2 ? "right" : "left"} key={service.title}>
      <span className="flight-service-icon"><ServiceIcon name={service.icon} /><span className="mono">{String(serviceCatalog.indexOf(service) + 1).padStart(2, "0")}</span></span>
      <div className="flight-service-copy"><span className="eyebrow flight-service-category">{service.category}</span><h3><Link prefetch={false} href={`/contact?service=${encodeURIComponent(service.title)}`}>{service.title}<Arrow /></Link></h3>{detailed && <p>{service.description}</p>}</div>
    </article>)}</div>
    {introduction && <div className="flight-bottom"><p>One creative partner. Every possibility.</p><Link prefetch={false} href="/services" className="text-link">Explore our expertise <Arrow /></Link></div>}
  </div>;
}
