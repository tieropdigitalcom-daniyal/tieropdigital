# Project tree update — 29 October 2026

## Design and scope

The former book presentation on Home and Work is replaced by a custom chrome tree
with cyan glass leaves and real hanging project cards. Four cards appear on its
branches at a time. Selection rotates through all eight projects and updates a
readable title, overview and project links below the tree. Existing thumbnails
remain unchanged; three projects without thumbnails use honest brand-initial art.
All filters, URLs and service-to-contact preselection are retained. Hero, hands,
services, studio, navigation and footer design are preserved.

The 3-second carousel uses state and a timer, without CSS completion locks or
whole-scene hover/focus traps. Arrows, wrapping, numbered selectors, keyboard and
horizontal touch input are supported. Manual actions pause; Play resumes.
Hidden/offscreen content pauses. Reduced-motion and save-data start without motion.
No wheel listener or preventDefault on vertical gestures is added.

The tree is prerendered artwork, not a live physics scene. WebP sizes are 142,536
bytes at 768px and 338,680 bytes at 1280px. Assets load lazily; no runtime dependency
was added. Real performance varies by device; no frame-rate guarantee is claimed.

## Inquiry changes

Removed Supabase/Google OAuth routes and the sign-in requirement. Only secure email
submission, rate-limiting metadata and the optional signed delivery webhook remain.
Client name appears in sender display, subject/body; Reply-To uses the entered
email. No email spoofing or unverified claim of Google identity.

Unconfigured/offline delivery uses an explicit validated draft flow with mailto and
Gmail compose links. The client presses Send in their mail app. Automatic sending
requires RESEND_API_KEY and a verified INQUIRY_FROM_EMAIL. Production settings are
currently empty, so no real sending/inbox receipt is claimed. SETUP.md explains
configuration and the final real delivery check.

## Verification

- TypeScript and the production build are required before packaging.
- 19 real-route/security tests cover anonymous setup, validation, CSRF, origin,
  stable idempotency payloads/retries, provider failures, IP limits and webhooks,
  using isolated SQLite and mocked providers. No real email is sent by tests.
- 48 responsive layouts across Home, Work, Expertise, Studio, Contact, Privacy,
  Terms and a project detail page at 320, 390, 768, 1024, 1366 and 1440 px showed
  no horizontal overflow. This is browser responsive QA, not physical-phone testing.
- Laptop Next/Previous, wrap from project eight to one, keyboard End and the
  Healthcare single-project filter passed. Mobile Next worked; native wheel over
  the tree moved the iframe scroll position from 155 to 389 without scroll capture.
- A typed sample name/email/phone and Graphic design selection produced a complete
  mailto draft to the fixed business inbox. No Google sign-in button remains.
- All 15 main/legal/project routes returned HTTP 200; an unknown project and the
  removed Google sign-in route returned 404. Parallel cold development compilations
  briefly returned server errors; sequential warm checks all passed.
- The mobile navigation opened via native accessibility input. Browser tooling's
  frame locator clicks were inconsistent; no header source changes were required.
- Autoplay was observed advancing, with the source interval fixed at 3,000 ms.
  No live inbox receipt or signed production delivery event was tested.

## Artwork

Built-in image generation was used for one project-bound asset. The source PNG is
preserved in the task workspace; responsive variants live at
public/assets/project-tree-768.webp and public/assets/project-tree-1280.webp.
The image has a transparent alpha channel; the website supplies the dark backdrop.

Final prompt:

Use case: stylized-concept. Asset type: premium interactive digital agency portfolio background sculpture. Create one exquisite full 3D tree, a bespoke sculptural tree of growth for TIEROP DIGITAL's dark navy and electric cyan website. Isolated on genuine transparent alpha. A gracefully twisting dark polished titanium/chrome trunk in the center, tapering into six to eight elegant, widely spread organic branches, with very sparse translucent cyan glass leaf clusters and a few subtle violet highlights. High-end gallery object, physically based 3D render, restrained futuristic luxury, beautiful dimensional lighting and reflective materials. Frontal three-quarter view with broad branch canopy in the upper two thirds, and roots merging into a small dark circular base at bottom center. The tree fills roughly 88 percent of a wide 3:2 landscape composition, with clear breathing space around the silhouette and branch tips. Branches spread toward upper left, upper right, middle left and middle right, intentionally open enough for separate real website project cards to be suspended from these branches by UI afterwards. Render ONLY the tree and its little base, not any cards. No interface, no screens, no labels, no letters, no numbers, no logo, no background, no scenery, no ground rectangle, no shadows beyond the object, no frame. Crisp beautifully modeled organic form rather than glowing neon line art, controlled cyan reflections rather than excessive bloom. Entire tree from every twig to base remains in frame.

API reference used to verify sending/display-name/Reply-To behavior:
https://resend.com/docs/api-reference/emails/send-email
Idempotency reference:
https://resend.com/changelog/idempotency-keys
