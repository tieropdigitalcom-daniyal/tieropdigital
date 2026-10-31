# Tierop Digital update — 31 October 2026

## Included

- Ten complete service pages: websites/Webflow, web applications/MERN/Supabase, Shopify, AI automation, chatbots, LLM/RAG, ChatGPT/Gemini access, graphic design, video and SEO/growth.
- Ten original English articles, an insights collection and connected service/article links.
- A team page and homepage team section for M Qasim Hassan, Daniyal and Mudassir, with the requested roles, English introductions and business email links.
- Three transparent portrait cutouts on the same dark studio backdrop.
- Removal of the illuminated header rule and unused image area above the logo.
- Responsive WebP exports of the existing flower artwork and earlier idle loading of the inquiry form to reduce work during the services-to-flower transition.
- Page-specific titles/descriptions, canonical and social metadata for new pages, Service/BlogPosting/Person/Breadcrumb structured data, and sitemap entries.

## Confirmed offers

| Package | Total price | Duration | Email |
| --- | --- | --- | --- |
| ChatGPT | PKR 1,000 | 1 month | Customer's own email |
| Gemini | PKR 900 | 18 months | Customer's own email |

The offers appear on `/services/chatgpt-gemini-services` and its related article. They are not displayed on the homepage. No unconfirmed plan tier, unlimited allowance or official reseller status is claimed.

## Update the existing GitHub/Hostinger project

1. Back up or commit unrelated local work in the existing repository.
2. Extract the ZIP. Copy the contents of its `tieropdigital-main` folder over the existing `C:\Users\qasim\Downloads\tieropdigital-git` folder. Include the new folders and files. Keep the existing `.git` folder and environment files.
3. Open PowerShell in the existing repository and run:

```powershell
npm.cmd ci
npm.cmd test
npm.cmd run build
npm.cmd run dev
```

4. Review `http://localhost:5173`, `/services`, `/services/chatgpt-gemini-services`, `/team` and `/blog`.
5. Commit and push the reviewed update:

```powershell
git add .
git commit -m "Add service pages, insights and leadership team"
git push origin main
```

6. Let Hostinger finish the existing deployment. Retain Node 22, `npm run build`, `.next` and the email environment settings.
7. After deployment, check the public sitemap and request indexing of important new pages in your Google Search Console account.

If using the optional patch instead of copying the ZIP, first run `git apply --check tieropdigital-update.patch`. Apply it with `git apply tieropdigital-update.patch` only when that check succeeds. The patch is based on the exact uploaded archive; a different repository state can require a manual merge. Use one update method.

## Portrait treatment

The built-in Imagegen editor was used for background extraction, with the same instructions for all three original photographs: remove only the background and circular frame; preserve the person's face, hair, beard, glasses where present, clothing, expression and proportions; do not beautify, retouch or relight; output a transparent head-and-upper-torso cutout. The results were resized for web delivery and sit on the identical `.team-portrait` CSS backdrop.

Final assets: `public/assets/team/qasim.webp`, `public/assets/team/daniyal.webp` and `public/assets/team/mudassir.webp`. Original uploaded photographs were retained separately during editing.

## Deployment status

Production releases use the existing GitHub `main` to Hostinger integration. After the source update is pushed, verify the Hostinger build and public pages. The historical Sites project is separate from this deployment and was unavailable; no new Sites project is required.

Validation results are recorded in `VALIDATION.md`. Search rankings are not guaranteed by adding keywords or articles.
