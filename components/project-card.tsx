import Link from "next/link";
import type { CSSProperties } from "react";
import type { Project } from "@/lib/content";
import { CardArt } from "./depth-art";
import { Arrow } from "./icons";

export function ProjectCard({ project, index = 0, reveal = true }: { project: Project; index?: number; reveal?: boolean }) {
  const initials = project.name.split(" ").slice(0, 2).map(word => word[0]).join("");
  return <article className={`project-card ${reveal ? "reveal" : ""}`} style={{ "--project-color": project.color } as CSSProperties}><div className="project-card-surface" data-tilt><CardArt variant={index} /><div className="project-card-head"><span className="mono">PROJECT {String(index + 1).padStart(2, "0")}</span><span className="project-card-type"><i />{project.label}</span></div>
    <Link prefetch={false} className={`project-image ${project.image ? "" : "project-identity"}`} href={`/work/${project.slug}`} aria-label={`Explore ${project.name}`}>
      {project.image ? <img src={`/assets/${project.image}-1448.webp`} srcSet={`/assets/${project.image}-720.webp 720w, /assets/${project.image}-1448.webp 1448w`} sizes="(max-width: 760px) 84vw, 580px" width="1448" height="1086" alt={`${project.name} website shown on desktop, tablet and mobile`} loading="lazy" decoding="async" /> : <div className="project-identity-art" aria-hidden="true"><span className="identity-orbit" /><span className="identity-initials">{initials}</span><span className="identity-name">{project.name}</span><span className="identity-label eyebrow">LIVE WEBSITE</span></div>}
      <span className="project-open">Explore project <Arrow /></span><span className="image-number mono">{String(index + 1).padStart(2, "0")}</span>
    </Link>
    <div className="project-caption"><div><span className="eyebrow project-category">{project.label} / WEBSITE</span><h3><Link prefetch={false} href={`/work/${project.slug}`}>{project.name}</Link></h3></div><a className="round-link" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.name} website (opens in a new tab)`}><Arrow /></a></div>
  </div></article>;
}
