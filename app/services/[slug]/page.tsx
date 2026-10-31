import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow } from "@/components/icons";
import { ServiceIcon } from "@/components/service-icon";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { StructuredData } from "@/components/structured-data";
import { SITE_URL, WHATSAPP_URL } from "@/lib/content";
import { servicePages, getService, aiAccessPackages } from "@/lib/service-pages";
import { articles, readingTime } from "@/lib/articles";
import { pageMetadata } from "@/lib/page-metadata";

export const dynamicParams = false;
export function generateStaticParams() { return servicePages.map(service => ({ slug: service.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const service = getService((await params).slug);
  return service ? pageMetadata(service.title, service.description, `/services/${service.slug}`, service.keywords) : {};
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const service = getService((await params).slug);
  if (!service) notFound();
  const access = service.slug === "chatgpt-gemini-services";
  const related = service.related.map(getService).filter(item => !!item);
  const guides = articles.filter(article => article.service === service.slug);
  const contact = `/contact?service=${encodeURIComponent(service.title)}`;
  return <main id="main" className="service-detail-page">
    <div className="page-intro shell service-detail-intro"><Breadcrumbs items={[{ label: "Services", href: "/services" }, { label: service.title }]} /><div className="intro-topline"><span className="eyebrow">{service.category} / TIEROP DIGITAL</span><span className="service-detail-icon"><ServiceIcon name={service.icon} /></span></div><div className="service-title-layout"><h1>{service.title}<span className="cyan">.</span></h1><p>{service.description}</p></div><div className="service-intro-actions"><Link prefetch={false} href={contact} className="button button-primary">{access ? "Ask about a package" : "Discuss your project"}<Arrow /></Link><a href={access ? "#packages" : "#included"} className="text-link">{access ? "View packages" : "Explore the service"}<span aria-hidden="true">↓</span></a></div></div>
    <section className="service-story section shell" aria-labelledby="service-story-heading"><span className="eyebrow">A CLEAR PURPOSE. A CONSIDERED APPROACH.</span><div><h2 id="service-story-heading">{service.headline}</h2><p>{service.introduction}</p></div></section>
    {access && <section className="access-section shell" id="packages" aria-labelledby="packages-title"><div className="section-label"><span className="eyebrow">AI ACCESS / ON YOUR OWN EMAIL</span><span className="mono muted">PRICES IN PAKISTANI RUPEES</span></div><h2 id="packages-title">Choose your next possibility.</h2><div className="access-grid">{aiAccessPackages.map(pack => <article className="access-card" key={pack.name}><span className="eyebrow">{pack.label}</span><h3>{pack.name}</h3><p className="access-price"><span>PKR</span> {pack.price.toLocaleString("en-PK")}</p><p className="access-duration">For <strong>{pack.duration}</strong><span>On your own email</span></p><a className="button button-primary" target="_blank" rel="noopener noreferrer" href={`${WHATSAPP_URL}?text=${encodeURIComponent(`Hello Tierop Digital, I am interested in the ${pack.name} package: PKR ${pack.price.toLocaleString("en-PK")} for ${pack.duration} on my own email. Please confirm plan details and activation.`)}`}>Ask about {pack.name}<Arrow /></a></article>)}</div><p className="access-note">Packages offered by Tierop Digital. Confirm the included plan, eligibility, current availability and activation terms with our team before ordering.</p></section>}
    <section className="service-included section shell" id="included" aria-labelledby="included-title"><div className="section-label"><span className="eyebrow">{access ? "THE DETAILS" : "WHAT WE CAN BUILD TOGETHER"}</span><span className="mono muted">DEFINED AROUND YOUR NEEDS</span></div><h2 id="included-title">{access ? "Clear from the start." : "The details make the difference."}</h2><div className="deliverable-grid">{service.deliverables.map((item, index) => <article className="deliverable-card" key={item.title}><span className="mono cyan">0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></section>
    <section className="service-fit shell" aria-labelledby="fit-title"><div><span className="eyebrow">IS THIS WHAT YOU HAVE IN MIND?</span><h2 id="fit-title">A good fit for<br /><span className="muted">your next chapter.</span></h2><ul>{service.useCases.map(useCase => <li key={useCase}>{useCase}</li>)}</ul></div><div className="service-approach"><span className="eyebrow">HOW WE APPROACH IT</span><p>{service.approach}</p><Link prefetch={false} href={contact} className="text-link">Let’s talk about the details<Arrow /></Link></div></section>
    <section className="service-faq section shell" aria-labelledby="faq-title"><div><span className="eyebrow">A FEW USEFUL ANSWERS</span><h2 id="faq-title">Before we begin.</h2></div><div className="faq-list">{service.faqs.map(faq => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div></section>
    {guides.length > 0 && <section className="service-guides shell" aria-labelledby="guides-title"><div className="section-label"><span className="eyebrow" id="guides-title">A LITTLE MORE PERSPECTIVE</span><Link prefetch={false} className="text-link" href="/blog">All insights<Arrow /></Link></div>{guides.map(guide => <Link prefetch={false} className="guide-link" key={guide.slug} href={`/blog/${guide.slug}`}><span className="mono">{readingTime(guide)} MIN READ</span><h3>{guide.title}</h3><Arrow /></Link>)}</section>}
    <section className="section shell related-services" aria-labelledby="related-title"><div className="section-label"><span className="eyebrow" id="related-title">CONNECTED EXPERTISE</span><Link prefetch={false} className="text-link" href="/services">All services<Arrow /></Link></div><div className="related-service-grid">{related.map(item => <Link prefetch={false} href={`/services/${item.slug}`} className="related-service" key={item.slug}><ServiceIcon name={item.icon} /><h3>{item.title}</h3><Arrow /></Link>)}</div></section>
    <StructuredData data={{ "@context": "https://schema.org", "@type": "Service", "@id": `${SITE_URL}/services/${service.slug}#service`, name: service.title, description: service.description, url: `${SITE_URL}/services/${service.slug}`, serviceType: service.title, provider: { "@id": `${SITE_URL}/#organization` }, ...(access ? { offers: aiAccessPackages.map(pack => ({ "@type": "Offer", name: `${pack.name} — ${pack.duration} on your own email`, price: pack.price, priceCurrency: "PKR", description: `Access package for ${pack.duration}. Plan and activation terms confirmed before ordering.`, url: `${SITE_URL}/services/${service.slug}#packages` })) } : {}) }} />
  </main>;
}
