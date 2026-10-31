import { articles } from "@/lib/articles";
import { SITE_URL } from "@/lib/content";
import { pageMetadata } from "@/lib/page-metadata";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ArticleCard } from "@/components/article-card";
import { StructuredData } from "@/components/structured-data";

export const metadata = pageMetadata("Insights on AI, Websites & Design", "Practical guides to AI automation, chatbots, LLMs, websites, Shopify, branding, video and SEO from Tierop Digital.", "/blog");
export default function BlogPage() {
  return <main id="main"><div className="page-intro shell blog-intro"><Breadcrumbs items={[{ label: "Insights" }]} /><div className="intro-topline"><span className="eyebrow">THE STUDIO JOURNAL / PRACTICAL PERSPECTIVES</span><span className="mono muted">IDEAS WORTH EXPLORING.</span></div><h1>A little perspective.<br /><span className="muted">For your next move.</span></h1><p>Clear thinking on design, development and AI. Useful starting points for the decisions behind your next digital project.</p></div><section className="shell section blog-collection" aria-label="All insights"><div className="section-label"><span className="eyebrow">OUR LATEST THINKING</span><span className="mono muted">{articles.length} PRACTICAL GUIDES</span></div><div className="article-grid">{articles.map((article, index) => <ArticleCard key={article.slug} article={article} index={index} />)}</div></section><StructuredData data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "Tierop Digital Insights", url: `${SITE_URL}/blog`, mainEntity: { "@type": "ItemList", itemListElement: articles.map((article, index) => ({ "@type": "ListItem", position: index + 1, name: article.title, url: `${SITE_URL}/blog/${article.slug}` })) } }} /></main>;
}
