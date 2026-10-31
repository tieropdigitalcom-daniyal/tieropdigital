# Tierop Digital

The Tierop Digital agency website uses Next.js and React. The established dark/cyan design, image portfolio, flower artwork and project inquiry system are retained.

## Run locally

Use Node.js 22.13 or later (below Node 25):

```sh
npm ci
npm run dev
```

Open `http://localhost:5173`. On Windows use `npm.cmd` if PowerShell blocks the npm script shim. The development launcher accepts `--host` / `--hostname` and `--port` for shared previews.

## Check and build

```sh
npm test
npm run typecheck
npm run build
npm start
```

The production server uses port 3000. Production builds use webpack, matching the existing Hostinger configuration. The minimatch security/compatibility patch remains in the existing hooks.

## Content

- `lib/service-pages.ts`: ten complete services and AI access offers.
- `lib/articles.ts`: ten original guides, sections and related services.
- `lib/team.ts`: leadership names, roles, biographies, emails and portraits.
- `lib/service-routes.ts`: the original homepage links mapped to full service pages.
- `app/services/[slug]`: statically generated service pages.
- `app/blog` and `app/blog/[slug]`: insights collection and articles.
- `app/team`: leadership page, reached through header and footer links.
- `app/expansion.css`: new layouts and focused header/flower refinements.
- `public/assets/team`: optimized transparent portraits on a shared CSS backdrop.

ChatGPT is PKR 1,000 for one month. Gemini is PKR 900 for 18 months. Access is offered on the customer's own email; plan details are confirmed with Tierop Digital. Offers appear inside services and the related guide, not on the homepage.

## Hosting

The existing deployment is GitHub to Hostinger using `npm run build`, Node 22 and `.next`. See `UPDATE-GUIDE.md`. Retain the production environment variables. The historical `.openai/hosting.json` is preserved; its Sites project was inaccessible during this update.

The inquiry and delivery webhook features retain their configuration and security behavior. See `SECURITY-FIX.md` and the existing setup notes for email requirements.
