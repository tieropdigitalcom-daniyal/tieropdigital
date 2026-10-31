import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow } from "@/components/icons";
import { projects } from "@/lib/content";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.filter(project => project.image).map(project => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug && item.image);
  if (!project) notFound();

  return {
    title: project.name,
    description: project.overview,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.name} | TIEROP DIGITAL`,
      description: project.overview,
      url: `/work/${project.slug}`,
      images: [{ url: `/assets/${project.image}-1448.webp`, width: 1448, height: 1086, alt: `${project.name} responsive website preview` }],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const websites = projects.filter(project => project.image);
  const index = websites.findIndex(project => project.slug === slug);
  if (index < 0) notFound();
  const project = websites[index];
  const next = websites[(index + 1) % websites.length];

  return (
    <main id="main">
      <div className="page-intro project-intro shell">
        <nav className="project-breadcrumb" aria-label="Breadcrumb">
          <Link prefetch={false} href="/work">All work</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{project.name}</span>
        </nav>
        <h1>{project.name}</h1>
        <div className="project-meta">
          <span className="eyebrow">{project.label} / WEBSITE</span>
          <a className="text-link" href={project.url} target="_blank" rel="noopener noreferrer">Visit website <Arrow /><span className="sr-only"> (opens in a new tab)</span></a>
        </div>
      </div>
      <section className="shell" aria-label={`${project.name} project`}>
        <img className="project-hero-image" src={`/assets/${project.image}-1448.webp`} srcSet={`/assets/${project.image}-720.webp 720w, /assets/${project.image}-1448.webp 1448w`} sizes="(max-width: 760px) calc(100vw - 48px), 1320px" width="1448" height="1086" alt={`${project.name} website shown on desktop, tablet and mobile`} fetchPriority="high" decoding="async" />
        <div className="project-summary">
          <h2>The project.</h2>
          <p>{project.overview}</p>
        </div>
        <div className="project-next">
          <div><span className="eyebrow">NEXT PROJECT</span><h3>{next.name}</h3></div>
          <Link prefetch={false} href={`/work/${next.slug}`} aria-label={`View next project: ${next.name}`}><Arrow /></Link>
        </div>
      </section>
    </main>
  );
}
