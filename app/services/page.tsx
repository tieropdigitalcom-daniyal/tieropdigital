import { DepthArt } from "@/components/depth-art";
import type { Metadata } from "next";
import Link from "next/link";
import { ServiceCatalog } from "@/components/service-catalog";
import { Arrow, Spark } from "@/components/icons";
export const metadata: Metadata = { title: "Expertise", description: "Web applications, Shopify, Webflow, full-stack and MERN development, Supabase apps, AI automation, Upwork optimization, graphic design, video editing and AI videos.", alternates: { canonical: "/services" } };
export default function ServicesPage() {
  return <main id="main" className="expertise-page"><div className="page-intro shell"><DepthArt priority /><div className="intro-topline"><span className="eyebrow">OUR EXPERTISE / YOUR NEXT POSSIBILITY</span><span className="availability-note"><span className="status-dot" /> OPEN FOR COLLABORATIONS</span></div><div className="page-intro-split"><h1>One creative partner.<br /><span className="muted">Every possibility.</span></h1><p>Websites, applications, automation and content. Everything your next chapter needs, thoughtfully brought together.</p></div><div className="expertise-intro-note"><Spark /><span>From a single idea to the whole experience.</span><a href="#service-collection">Explore all 11 services <span>↓</span></a></div></div><section className="section services-page-list shell" id="service-collection" aria-label="Our services"><ServiceCatalog /><div className="project-callout"><div><span className="eyebrow">HAVE SOMETHING DIFFERENT IN MIND?</span><h2>Let’s connect the dots.</h2><p>Combine the services you need into one considered project.</p></div><Link prefetch={false} className="button button-primary" href="/contact">Tell us about your idea <Arrow /></Link></div></section></main>;
}
