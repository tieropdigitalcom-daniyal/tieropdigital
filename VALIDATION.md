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
