import type { Metadata } from "next";
import Link from "next/link";
import { DepthArt } from "@/components/depth-art";
import { Gallery } from "@/components/gallery";
import { Arrow } from "@/components/icons";
import { projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Selected Work",
  description: "Explore TIEROP DIGITAL’s selected website projects, with previews from automotive, property and healthcare brands.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const count = projects.filter(project => project.image).length;

  return (
    <main id="main">
      <div className="page-intro shell">
        <DepthArt priority />
        <div className="intro-topline">
          <span className="eyebrow">TIEROP DIGITAL / SELECTED WORK</span>
          <span className="mono muted">{String(count).padStart(2, "0")} WEBSITES. DISTINCT PERSPECTIVES.</span>
        </div>
        <div className="page-intro-split">
          <h1>Ideas made<br /><span className="muted">real.</span></h1>
          <p>A closer look at our website work. Explore a project or go straight to the live experience.</p>
        </div>
      </div>
      <section className="section shell portfolio-section" aria-label="Website portfolio">
        <Gallery />
        <div className="project-callout">
          <div>
            <span className="eyebrow">YOUR NEXT CHAPTER</span>
            <h2>Let’s make something<br />distinctly yours.</h2>
            <p>Tell us what you have in mind.</p>
          </div>
          <Link prefetch={false} href="/#start-a-project" className="button button-primary">Start a project <Arrow /></Link>
        </div>
      </section>
    </main>
  );
}
