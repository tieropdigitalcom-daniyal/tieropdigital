import type { MetadataRoute } from "next";
import { projects, SITE_URL } from "@/lib/content";
import { servicePages } from "@/lib/service-pages";
import { articles } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/work", "/about", "/team", "/services", "/blog", "/contact", ...projects.map(project => `/work/${project.slug}`), ...servicePages.map(service => `/services/${service.slug}`), ...articles.map(article => `/blog/${article.slug}`)]
    .map(path => ({ url: `${SITE_URL}${path}`, changeFrequency: "monthly" as const, priority: path === "" ? 1 : path.startsWith("/services/") ? .8 : .7 }));
}
