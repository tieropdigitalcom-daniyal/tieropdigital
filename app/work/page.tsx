import { DepthArt } from "@/components/depth-art";
import type { Metadata } from "next";
import { Gallery } from "@/components/gallery";
export const metadata: Metadata = { title: "Our Work", description: "Explore TIEROP DIGITAL’s portfolio of live websites, from automotive and property to healthcare.", alternates: { canonical: "/work" } };
export default function WorkPage() {
  return <main id="main"><div className="page-intro shell"><DepthArt priority /><div className="intro-topline"><span className="eyebrow">THE WORK / A CLOSER LOOK</span><span className="mono muted">DIFFERENT BUSINESSES. DISTINCT EXPERIENCES.</span></div><div className="page-intro-split"><h1>Every idea.<br /><span className="muted">A new branch.</span></h1><p>One creative foundation. Eight distinct digital experiences. Explore the projects growing from our work.<a className="book-intro-link" href="#portfolio-project-tree">Explore the project tree <span>↓</span></a></p></div></div><section className="section portfolio-section shell" aria-label="Project collection"><Gallery /></section></main>;
}
