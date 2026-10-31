import type { Metadata } from "next";
import "./globals.css";
import "./depth.css";
import "./connection.css";
import "./editorial.css";
import "./portfolio.css";
import "./refinements.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Effects } from "@/components/effects";
import { EMAIL, SITE_URL } from "@/lib/content";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "TIEROP DIGITAL — Beyond Ordinary", template: "%s | TIEROP DIGITAL" },
  description: "Web applications, Shopify, Webflow, full-stack development, AI automation, graphic design and video. TIEROP DIGITAL brings your ideas to life.",
  openGraph: { title: "TIEROP DIGITAL — Beyond Ordinary", description: "Thoughtful design. Distinctive digital experiences.", type: "website", url: SITE_URL, siteName: "TIEROP DIGITAL", images: [{ url: "/assets/hero-1536.webp", width: 1536, height: 1024, alt: "TIEROP DIGITAL cinematic chrome portrait" }] },
  twitter: { card: "summary_large_image", title: "TIEROP DIGITAL — Beyond Ordinary", description: "Thoughtful design. Distinctive digital experiences.", images: ["/assets/hero-1536.webp"] },
  icons: {
    icon: "/assets/tierop-logo-96.png",
    shortcut: "/assets/tierop-logo-96.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head><link rel="preload" href="/assets/fonts/sans-regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /></head>
      <body id="top"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Organization", name: "TIEROP DIGITAL", url: SITE_URL, email: EMAIL, telephone: "+923127204408", logo: `${SITE_URL}/assets/tierop-logo-384.webp`, sameAs: ["https://www.instagram.com/tieropdigital/"] }) }} /><Header />{children}<Footer /><Effects /></body>
    </html>
  );
}
