import { DepthArt } from "@/components/depth-art";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/lib/content";
import { Arrow } from "@/components/icons";
type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return projects.map(project => ({ slug: project.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const p = projects.find(p => p.slug === slug); return { title: p?.name ?? "Project", description: p?.overview ?? "Explore a TIEROP DIGITAL portfolio project.", alternates: { canonical: `/work/${slug}` } }; }
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params; const index = projects.findIndex(p => p.slug === slug); const project = projects[index]; if (!project) notFound();
  const next = projects[(index + 1) % projects.length];
  return <main id="main"><div className="page-intro project-intro shell"><DepthArt priority /><div className="project-breadcrumb"><Link prefetch={false} href="/work">All work</Link><span>/</span><span>{project.name}</span></div><h1>{project.name}</h1><div className="project-meta"><span className="eyebrow">{project.label}{project.image ? " / RESPONSIVE WEBSITE" : ""}</span><a className="button button-outline" href={project.url} target="_blank" rel="noopener noreferrer">Visit live website <Arrow /></a></div></div>{project.image && <div className="shell"><img className="project-hero-image" src={`/assets/${project.image}-1448.webp`} width="1448" height="1086" alt={`${project.name} website across laptop, tablet and smartphone`} fetchPriority="high" /></div>}<section className="shell"><div className="project-summary"><h2>The experience.</h2><p>{project.overview ?? "Explore this project on the live website."}</p></div><div className="project-next"><Link prefetch={false} href="/work" className="text-link">Back to all work</Link><Link prefetch={false} href={`/work/${next.slug}`}><div><span className="eyebrow muted">NEXT PROJECT</span><h3>{next.name}</h3></div><Arrow /></Link></div></section></main>;
}
