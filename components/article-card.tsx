import Link from "next/link";
import { type Article, readingTime } from "@/lib/articles";
import { Arrow } from "./icons";
import { ServiceIcon } from "./service-icon";

export function ArticleCard({ article, index }: { article: Article; index: number }) {
  return <article className="article-card"><Link prefetch={false} href={`/blog/${article.slug}`} className="article-card-link"><div className="article-card-art" aria-hidden="true"><span className="article-art-number mono">{String(index + 1).padStart(2, "0")} / FIELD NOTES</span><ServiceIcon name={article.icon} /><span className="article-art-orbit" /></div><div className="article-card-body"><div className="article-meta"><span className="eyebrow">{article.category}</span><span className="mono">{readingTime(article)} MIN READ</span></div><h2>{article.title}</h2><p>{article.description}</p><span className="article-read">Read the story<Arrow /></span></div></Link></article>;
}
