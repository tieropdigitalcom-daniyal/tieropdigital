import type { MetadataRoute } from "next";
import { projects, SITE_URL } from "@/lib/content";
export default function sitemap(): MetadataRoute.Sitemap { return ["", "/work", "/about", "/services", "/contact", ...projects.map(p => `/work/${p.slug}`)].map(path => ({ url: `${SITE_URL}${path}`, changeFrequency: "monthly" as const, priority: path === "" ? 1 : .7 })); }
