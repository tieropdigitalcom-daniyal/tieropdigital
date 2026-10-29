# TIEROP DIGITAL — setup

The portfolio runs with React, TypeScript and CSS on Vinext / Cloudflare Workers.
The opening screen, hands, services, studio and existing project URLs are preserved.
Home and Work now use the new 3D project tree instead of the book.

## Run the downloadable project

Install Node.js 22.13 or newer. Extract the ZIP, open the TIEROP-DIGITAL folder,
and double-click START-WEBSITE.bat on Windows. The first installation needs internet.

Manual Windows commands:

```powershell
node scripts/prepare-local.mjs
npx.cmd --yes pnpm@11.25.0 install --frozen-lockfile
npx.cmd --yes pnpm@11.25.0 dev
```

On macOS/Linux, use `npx` instead of `npx.cmd`. Open http://localhost:5173 or the
address printed in the terminal. Keep the terminal open; Ctrl+C stops the website.
The ZIP includes the portable preparation and launcher scripts.

## Project tree and laptop controls

- A custom prerendered chrome/cyan 3D tree carries four hanging project cards.
- All eight original projects remain accessible using arrows, numbered selectors,
  category filters, and detail/live website links. Previous/Next wrap around.
- Desktop Arrow Left/Right, Home and End work when the tree stage is focused.
- A 3,000 ms carousel runs on both Home and Work. Manual selection pauses it;
  Play starts it again. Moving the mouse over the tree does not stop the timer.
- Hidden tabs and offscreen trees pause the timer. Reduced-motion/save-data
  preferences disable automatic motion initially; manual controls remain available.
- Horizontal gestures on the stage can browse. Vertical touch/wheel scrolling is
  left to the browser. No wheel capture, scroll pinning or global scroll lock.
- Navigation updates React state immediately; it never waits for animationend.
- Local responsive WebP images, fixed stage geometry and short CSS transitions
  keep the scene lightweight. No new dependency or continuous WebGL renderer.

## Contact: no Google login

The old Supabase/Google OAuth code and routes have been removed. Clients type
their own name, email, country, phone and message. Service preselection still works.

Only a small inquiry/email backend remains because direct delivery needs a secure
server-held API key. The website never exposes this key in browser code.

With email configured, the form posts to /api/inquiry and sends to the fixed inbox
`tieropdigital.com@gmail.com`. Emails display `Client Name via TIEROP DIGITAL`,
include the name in the subject and body, and set Reply-To to the client's entered
email. The actual sending address remains your verified domain. Entered client
addresses are not claimed to be independently verified.

Without email configuration, the complete form still works as an email-draft
builder: validate details, Prepare project email, then Open email app or Open a
Gmail draft. The client must review and press Send in their mail app. This is
clearly labeled; preparing a draft never displays a sent confirmation.

## Enable direct inbox delivery

1. In your Resend account, verify a domain you control and its sending DNS records.
2. Create a send-only API key scoped to the sending domain where supported.
3. Set these private production environment variables through secure Site settings:
   - RESEND_API_KEY: your sending API key.
   - INQUIRY_FROM_EMAIL: an address on that verified domain, e.g. hello@yourdomain.com.
4. Optionally add RESEND_WEBHOOK_SECRET and point Resend's signed delivery webhook
   at /api/email-webhook for delivery, delay, bounce, complaint and failure metadata.
5. Refresh Contact: the button changes to Send project inquiry. Submit a clearly
   labeled test, verify receipt in tieropdigital.com@gmail.com (including spam), and
   verify that Reply targets the entered client email.

For local development use an ignored .dev.vars file with the same variable names.
Do not paste private keys into chat, commit them, or include them in an export.
No Supabase, Google OAuth or APP_ORIGIN settings are needed for this contact flow.
The existing D1 DB binding/migration supplies rate-limit and duplicate metadata.

The endpoint validates all fields server-side, bounds input size, checks same-origin
and a form CSRF cookie, rejects honeypots, limits attempts per visitor/IP, and uses
stable email idempotency keys. D1 stores secret-salted identity hashes, payload
hashes, timestamps/status and provider IDs, not names, addresses or message text.
A success response means provider acceptance for processing, not inbox receipt.

As of this update production email environment settings are empty. No real message
was sent; direct delivery is not enabled yet. The draft flow is available now.

## Checks

```text
npx.cmd --yes pnpm@11.25.0 exec tsc --noEmit
node --experimental-strip-types --test tests/*.test.mjs
npx.cmd --yes pnpm@11.25.0 build
```

The automated email tests run the actual route modules with SQLite and simulated
provider responses. They do not call real services or use real keys. See
3D-UPDATE.md for the latest responsive browser checks and artwork brief.

The hosted review retains its existing owner-private audience and ChatGPT access
gate; this hosting gate is separate from the removed website Google login. Legal
pages remain review drafts. No Lighthouse score or physical-device certification
is claimed.
