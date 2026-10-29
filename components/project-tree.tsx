"use client";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import type { Project } from "@/lib/content";
import { Arrow } from "./icons";

function ProjectArtwork({ project }: { project: Project }) {
  return project.image ? <img src={`/assets/${project.image}-720.webp`} width="720" height="540" alt={`${project.name} website preview`} loading="lazy" decoding="async" /> : <div className="tree-project-identity"><span>{project.name.split(" ").slice(0, 2).map(word => word[0]).join("")}</span><small>LIVE WEB EXPERIENCE</small></div>;
}

export function ProjectTree({ items, id = "portfolio-project-tree", autoplay = true }: { items: Project[]; id?: string; autoplay?: boolean }) {
  const root = useRef<HTMLElement>(null);
  const activeRef = useRef(0);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [motion, setMotion] = useState(false);
  const count = items.length;
  const running = playing && visible && pageVisible && count > 1;

  const goTo = useCallback((requested: number, manual = true) => {
    if (!count) return;
    if (manual) setPlaying(false);
    const next = ((requested % count) + count) % count;
    activeRef.current = next;
    setActive(next);
  }, [count]);

  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const saveData = !!(navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    const update = () => { const allowed = !preference.matches && !saveData; setMotion(allowed); setPlaying(autoplay && allowed); };
    update(); preference.addEventListener("change", update);
    const visibility = () => setPageVisible(!document.hidden);
    visibility(); document.addEventListener("visibilitychange", visibility);
    const observer = new IntersectionObserver(entries => setVisible(entries[0].isIntersecting), { threshold: 0.08 });
    if (root.current) observer.observe(root.current);
    return () => { observer.disconnect(); preference.removeEventListener("change", update); document.removeEventListener("visibilitychange", visibility); };
  }, [autoplay]);

  useEffect(() => {
    if (!running) return;
    // State changes immediately. Carousel navigation never waits for CSS events.
    const timer = setInterval(() => goTo(activeRef.current + 1, false), 3000);
    return () => clearInterval(timer);
  }, [running, goTo]);

  const touchStart = (event: PointerEvent<HTMLDivElement>) => { if (event.pointerType !== "mouse" && !(event.target as Element).closest("button,a")) swipe.current = { x: event.clientX, y: event.clientY }; };
  const touchEnd = (event: PointerEvent<HTMLDivElement>) => {
    const start = swipe.current; swipe.current = null;
    if (!start) return;
    const dx = event.clientX - start.x, dy = event.clientY - start.y;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) goTo(activeRef.current + (dx < 0 ? 1 : -1));
  };
  if (!count) return <p className="no-projects">No projects in this selection.</p>;
  const project = items[active] ?? items[0];
  return <section id={id} ref={root} className="project-tree" aria-label="The project tree" aria-roledescription="carousel" data-animate={motion && visible && pageVisible} data-running={running}>
    <div className="tree-topline"><div><span className="tree-status-dot" /><span className="eyebrow">THE LIVING PORTFOLIO</span></div><span className="mono tree-edition">ROOTED IN IDEAS. MADE TO GROW.</span><div className="tree-navigation"><button className="tree-play" disabled={count < 2} aria-pressed={playing} aria-label={playing ? "Pause automatic projects" : "Play automatic projects"} onClick={() => setPlaying(value => !value)}><span aria-hidden="true">{playing ? "Ⅱ" : "▷"}</span>{playing ? "Pause" : "Play"}</button><button className="tree-arrow tree-previous" disabled={count < 2} onClick={() => goTo(activeRef.current - 1)} aria-label="Previous project"><Arrow diagonal={false} /></button><button className="tree-arrow" disabled={count < 2} onClick={() => goTo(activeRef.current + 1)} aria-label="Next project"><Arrow diagonal={false} /></button></div></div>
    <div className="tree-stage" tabIndex={0} aria-label="Project tree. Use left and right arrow keys to browse; scroll vertically as usual." onPointerDown={touchStart} onPointerUp={touchEnd} onPointerCancel={() => { swipe.current = null; }} onKeyDown={event => {
      if (event.target !== event.currentTarget || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault(); goTo(event.key === "Home" ? 0 : event.key === "End" ? count - 1 : activeRef.current + (event.key === "ArrowRight" ? 1 : -1));
    }}>
      <span className="tree-halo" aria-hidden="true" /><div className="tree-sculpture" aria-hidden="true"><img src="/assets/project-tree-1280.webp" srcSet="/assets/project-tree-768.webp 768w, /assets/project-tree-1280.webp 1280w" sizes="(max-width:700px) 140vw, 900px" width="1536" height="1024" alt="" loading="lazy" decoding="async" /></div>
      <span className="tree-stage-note mono" aria-hidden="true">EVERY BRANCH,<br />A DIFFERENT STORY.</span>
      {Array.from({ length: Math.min(4, count) }, (_, slot) => {
        const index = (active + slot) % count; const item = items[index];
        return <div className={`project-fruit project-fruit-${slot + 1}`} key={slot} data-selected={slot === 0}><span className="fruit-cord" aria-hidden="true"><i /></span><button className="fruit-card" onClick={() => goTo(index)} aria-label={`Select ${item.name}`} aria-current={slot === 0 ? "true" : undefined}><span className="fruit-image" key={item.slug}><ProjectArtwork project={item} /><span className="fruit-project-number mono">{String(index + 1).padStart(2, "0")}</span><span className="fruit-open" aria-hidden="true">↗</span></span><span className="fruit-caption"><small>{item.label}</small><strong>{item.name}</strong></span></button></div>;
      })}
      <div className="tree-root-label mono" aria-hidden="true"><span>DESIGN</span><i /> <span>DEVELOPMENT</span><i /> <span>GROWTH</span></div>
    </div>
    <div className="tree-project-detail"><div className="tree-project-count mono"><strong>{String(active + 1).padStart(2, "0")}</strong><span>/ {String(count).padStart(2, "0")}</span></div><div className="tree-project-copy"><span className="eyebrow">{project.label} / WEB EXPERIENCE</span><h3 role="status" aria-live={playing ? "off" : "polite"}>{project.name}</h3><p>{project.overview ?? "A distinct digital experience. Explore the details or visit the live website."}</p></div><div className="tree-project-links"><Link prefetch={false} href={`/work/${project.slug}`}>Explore project <Arrow /></Link><a href={project.url} target="_blank" rel="noopener noreferrer">Live website <span aria-hidden="true">↗</span><span className="sr-only">for {project.name} (opens in a new tab)</span></a></div></div>
    <div className="tree-selector" role="group" aria-label="Choose a project">{items.map((item, index) => <button key={item.slug} aria-label={`Show project ${index + 1}: ${item.name}`} aria-current={active === index ? "true" : undefined} onClick={() => goTo(index)}><span className="mono">{String(index + 1).padStart(2, "0")}</span><span className="tree-selector-line" /></button>)}</div>
    <p className="tree-hint mono">CHOOSE A HANGING PROJECT <span>OR USE THE ARROWS ↔</span></p>
  </section>;
}
