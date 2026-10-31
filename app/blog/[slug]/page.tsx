import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle, readingTime } from "@/lib/articles";
import { getService } from "@/lib/service-pages";
import { SITE_URL } from "@/lib/content";
import { pageMetadata } from "@/lib/page-metadata";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { StructuredData } from "@/components/structured-data";
import { Arrow } from "@/components/icons";
import { ArticleCard } from "@/components/article-card";

export const dynamicParams = false;
export function generateStaticParams() { return articles.map(article => ({ slug: article.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const article = getArticle((await params).slug);
  return article ? pageMetadata(article.title, article.description, `/blog/${article.slug}`, article.keywords, true) : {};
}
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  const service = getService(article.service)!;
  const more = articles.filter(item => item.slug !== article.slug).sort((a, b) => Number(b.category === article.category) - Number(a.category === article.category)).slice(0, 2);
  return <main id="main" className="article-page"><header className="page-intro shell article-intro"><Breadcrumbs items={[{ label: "Insights", href: "/blog" }, { label: article.title }]} /><div className="intro-topline"><span className="eyebrow">{article.category}</span><span className="mono muted">{readingTime(article)} MIN READ / A PRACTICAL GUIDE</span></div><h1>{article.title}</h1><div className="article-byline"><span className="article-author-mark">T<span>.</span></span><div><span>TIEROP DIGITAL</span><Link prefetch={false} href="/about">Notes from the studio<Arrow /></Link></div></div></header>
    <div className="shell article-layout"><aside className="article-sidebar"><nav aria-label="In this article"><span className="eyebrow">IN THIS ARTICLE</span>{article.sections.map((section, index) => <a href={`#${section.id}`} key={section.id}><span className="mono">0{index + 1}</span>{section.title}</a>)}</nav><Link prefetch={false} className="article-service-link" href={`/services/${service.slug}`}><span className="eyebrow">RELATED EXPERTISE</span><strong>{service.title}</strong><span>Explore the service<Arrow /></span></Link></aside>
    <article className="article-body"><p className="article-lead">{article.introduction}</p>{article.sections.map(section => <section key={section.id} id={section.id}><h2>{section.title}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{section.checklist && <ul>{section.checklist.map(item => <li key={item}>{item}</li>)}</ul>}</section>)}<div className="article-takeaway"><span className="eyebrow">TAKE IT INTO YOUR NEXT PROJECT</span><p>{article.takeaway}</p></div>{article.sources && <div className="article-sources"><span className="eyebrow">FURTHER READING / OFFICIAL DOCUMENTATION</span><ul>{article.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title}<Arrow /></a></li>)}</ul></div>}<div className="article-cta"><span className="eyebrow">FROM THE IDEA TO THE DETAILS</span><h2>Let’s make your next move a clear one.</h2><Link prefetch={false} href={`/services/${service.slug}`} className="text-link">Explore {service.title}<Arrow /></Link></div></article></div>
    <section className="section shell" aria-labelledby="more-insights-title"><div className="section-label"><span className="eyebrow" id="more-insights-title">KEEP EXPLORING</span><Link prefetch={false} href="/blog" className="text-link">All insights<Arrow /></Link></div><div className="article-grid">{more.map(item => <ArticleCard key={item.slug} article={item} index={articles.indexOf(item)} />)}</div></section>
    <StructuredData data={{ "@context": "https://schema.org", "@type": "BlogPosting", headline: article.title, description: article.description, url: `${SITE_URL}/blog/${article.slug}`, mainEntityOfPage: `${SITE_URL}/blog/${article.slug}`, author: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "TIEROP DIGITAL", url: `${SITE_URL}/about` }, publisher: { "@id": `${SITE_URL}/#organization` }, image: [`${SITE_URL}/assets/hero-1536.webp`], inLanguage: "en", articleSection: article.category }} />
  </main>;
}
