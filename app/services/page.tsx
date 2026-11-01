import { DepthArt } from "@/components/depth-art";
import { pageMetadata } from "@/lib/page-metadata";
import { StructuredData } from "@/components/structured-data";
import { SITE_URL } from "@/lib/content";
import { servicePages } from "@/lib/service-pages";
import Link from "next/link";
import { ServiceCatalog } from "@/components/service-catalog";
import { Arrow, Spark } from "@/components/icons";
export const metadata = pageMetadata("Web, AI & Creative Services", "Explore website development, Shopify, AI automation, chatbots, LLM and RAG applications, design, video and digital growth services from Tierop Digital.", "/services");
export default function ServicesPage() {
  return <main id="main" className="expertise-page"><div className="page-intro shell"><DepthArt priority /><div className="intro-topline"><span className="eyebrow">OUR EXPERTISE / YOUR NEXT POSSIBILITY</span><span className="availability-note"><span className="status-dot" /> OPEN FOR COLLABORATIONS</span></div><div className="page-intro-split"><h1>One team.<br /><span className="muted">Connected expertise.</span></h1><p>Custom websites, Shopify stores, AI systems and brand content. Choose the expertise your business needs next.</p></div><div className="expertise-intro-note"><Spark /><span>From your first brief to a working digital experience.</span><a href="#service-collection">Explore all 10 services <span>↓</span></a></div></div><section className="section services-page-list shell" id="service-collection" aria-label="Our services"><ServiceCatalog /><div className="project-callout"><div><span className="eyebrow">HAVE SOMETHING DIFFERENT IN MIND?</span><h2>Let’s connect the dots.</h2><p>Bring the right services together around one clear business goal.</p></div><Link prefetch={false} className="button button-primary" href="/contact">Tell us about your idea <Arrow /></Link></div></section><StructuredData data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "Tierop Digital Services", url: `${SITE_URL}/services`, mainEntity: { "@type": "ItemList", itemListElement: servicePages.map((service, index) => ({ "@type": "ListItem", position: index + 1, name: service.title, url: `${SITE_URL}/services/${service.slug}` })) } }} /></main>;
}
