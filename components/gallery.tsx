"use client";
import { useState } from "react";
import { projects } from "@/lib/content";
import { ProjectCard } from "./project-card";
const filters = ["All work", "Property", "Automotive", "Healthcare"];
export function Gallery() {
  const [filter, setFilter] = useState("All work");
  const visible = projects.filter(project => project.image && (filter === "All work" || project.label === filter.toUpperCase()));
  return <div id="website-collection"><div className="work-toolbar"><div className="portfolio-tabs" role="group" aria-label="Filter projects">{filters.map(name => <button key={name} className="filter-button" aria-pressed={filter === name} onClick={() => setFilter(name)}>{name}{name === "All work" ? ` (${String(projects.length).padStart(2, "0")})` : ""}</button>)}</div><span className="mono muted" role="status" aria-live="polite">{String(visible.length).padStart(2, "0")} {visible.length === 1 ? "WEBSITE" : "WEBSITES"}</span></div><div className="website-grid">{visible.map(project => <ProjectCard project={project} index={projects.indexOf(project)} reveal={false} key={project.slug} />)}</div></div>;
}
