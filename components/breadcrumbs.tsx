import Link from "next/link";
import { SITE_URL } from "@/lib/content";
import { StructuredData } from "./structured-data";

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return <><nav className="breadcrumbs" aria-label="Breadcrumb"><ol><li><Link prefetch={false} href="/">Home</Link></li>{items.map(item => <li key={item.label}>{item.href ? <Link prefetch={false} href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}</li>)}</ol></nav><StructuredData data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, ...items.map((item, index) => ({ "@type": "ListItem", position: index + 2, name: item.label, ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}) }))] }} /></>;
}
