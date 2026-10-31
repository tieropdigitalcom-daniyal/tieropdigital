import type { Metadata } from "next";
import { SITE_URL } from "./content";

export function pageMetadata(title: string, description: string, path: string, keywords: string[] = [], article = false): Metadata {
  return {
    title, description, keywords, alternates: { canonical: path },
    openGraph: { title, description, url: `${SITE_URL}${path}`, type: article ? "article" : "website", siteName: "TIEROP DIGITAL", images: [{ url: "/assets/hero-1536.webp", width: 1536, height: 1024, alt: "TIEROP DIGITAL — design, development and AI" }] },
    twitter: { card: "summary_large_image", title, description, images: ["/assets/hero-1536.webp"] },
  };
}
