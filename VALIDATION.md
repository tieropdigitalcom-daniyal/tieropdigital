# Validation — 1 November 2026

- `npm test`: all 39 existing content, inquiry, email and security tests passed.
- `npm run typecheck` passed. `npm run build` produced 38 outputs, including the retained API endpoints.
- Rendered HTML review covered 36 documents, 1,348 internal links/anchors, 179 image references and 79 valid JSON-LD blocks; no broken references or duplicate IDs were found. Each content page retained one H1.
- Privacy and Terms source copy is byte-identical to the supplied archive. The five pictured portfolio projects, separate Team page, original logo treatment and existing artwork remain.
- Browser review at 360px and 390px confirmed the seven-link phone menu, reopening, route navigation, closing and restored page scrolling. Menu entrance delays run from 0 to 210ms in 35ms steps; Insights and Let’s talk use the same animation as the earlier links.
- Additional layout review at 760px, 820px, 1024px and the normal desktop viewport found no horizontal document overflow or overlapping header controls on the reviewed pages.
- The Offers link reaches the package anchor. ChatGPT displays single-user personal access, PKR 1,000, one month and the customer's own email. Gemini retains PKR 900 for 18 months.
- Hero image transfer size changed from 49,234 to 25,779 bytes on phones and from 157,172 to 77,834 bytes on desktop. Both retain WebP fallbacks.
- Font transfer size changed from 107,300 to 45,828 bytes combined, retaining the original glyph outlines for the English site.
- Baseline public PageSpeed report: mobile Performance 93, desktop Performance 100; Accessibility, Best Practices and SEO 100 on both. This is a baseline, not a post-change claim. Report: https://pagespeed.web.dev/analysis/https-tieropdigital-com/2gfx1v1y41?form_factor=mobile
- Public-host asset responses currently lack Cache-Control despite the existing Next.js rule. This is observed Hostinger delivery behavior; no broad page-caching rules or hosting settings were changed.

## Deferred form layout follow-up

The first public post-change test measured mobile Performance 95, LCP 2.2s, TBT 10ms and CLS 0. The desktop run exposed a deferred-form shift: the inquiry panel grew from a 1,050px placeholder to 1,233px and displaced the footer. The form now reserves its full responsive footprint before loading (1,280px desktop, 1,400px small laptop, 1,390px wide phone and 1,480px small phone). This changes reserved space only; animation styles and the inquiry workflow are unchanged. Desktop layout is checked again after deployment.

## Previous update

# Validation — 31 October 2026

- `npm ci` completed using the existing lockfile. No dependencies were added.
- `npm test`: 39 tests passed, including existing inquiry/email/security checks and new content link, package duration, service selection and team email checks.
- `npm run typecheck` passed; the production build also completed its TypeScript checks.
- `npm run build` succeeded and generated 38 static outputs/routes, alongside the existing server API endpoints.
- Rendered HTML verification covered 34 content pages: ten service details, ten articles, the collections, team and existing pages.
- All 1,283 internal link/anchor references and 217 image references resolved.
- All 80 JSON-LD blocks parsed. The sitemap matched the 32 intended indexable content URLs. Each content page had one main heading and a canonical URL; new pages had matching social URLs.
- No duplicate element IDs remained in the rendered output. The loading status uses its own ID, separate from the page's main content.
- The homepage HTML and visible text contained none of the access package prices or durations.

## Browser review

The shared preview was inspected in Chrome at 1363 × 936 CSS pixels. Confirmed the existing homepage style and logo, all three team portraits and emails, the ten-article collection, an article reading layout and its canonical URL, the four-item AI service filter, the access page with the correct prices/durations, and scrolling from the flower into the preloaded inquiry form. Reviewed pages had no horizontal document overflow.

The preview launcher accepts the shared preview CLI flags, and `terminal.local` is listed in Next.js development-only allowed origins so client scripts load there. Production hosting configuration is unchanged.

Responsive layouts are implemented in the CSS; a separate handset/device-emulation pass was not performed. No PageSpeed score or frame-rate benchmark is claimed.

## Publication

Production publication uses the existing GitHub `main` to Hostinger integration. Source publication and the Hostinger build must be verified separately from the successful local checks above. The historical Sites project was unavailable. See `UPDATE-GUIDE.md` for the existing deployment workflow.
