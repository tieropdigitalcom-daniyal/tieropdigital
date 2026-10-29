"use client";
import { useState } from "react";
import { projects } from "@/lib/content";
import { ProjectTree } from "./project-tree";
const filters = ["All work", "Property", "Automotive", "Healthcare"];
export function Gallery() {
  const [filter, setFilter] = useState("All work");
  const visible = projects.filter(project => filter === "All work" || project.label === filter.toUpperCase());
  return <><div className="work-toolbar"><div className="portfolio-tabs" role="group" aria-label="Filter projects">{filters.map(name => <button key={name} className="filter-button" aria-pressed={filter === name} onClick={() => setFilter(name)}>{name}{name === "All work" ? " (08)" : ""}</button>)}</div><span className="mono muted" role="status" aria-live="polite">{String(visible.length).padStart(2, "0")} PROJECTS</span></div><ProjectTree key={filter} items={visible} /></>;
}
