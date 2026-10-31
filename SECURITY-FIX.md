# Minimatch security update

The lint dependency tree previously installed minimatch 3.1.5 and 10.2.6,
flagged by CVE-2026-118764 / GHSA-g3hv-75wg-m249. The project now pins
minimatch 11.0.3 and overrides transitive copies to that same patched release.
The existing ESLint and Next.js versions are retained.

Legacy ESLint plugins call `require("minimatch")` as a function, whereas upstream
11 exposes a namespace. `scripts/patch-minimatch.mjs` adds a guarded CommonJS
export adapter after installation. It does not change the upstream matcher or
ESM entry. Named helpers, including `.minimatch` and `.Minimatch`, are preserved.
The adapter is checked again before lint, tests and builds, and is idempotent.
Production installs without development dependencies skip it.

Commit the hook, package manifest and lockfile together. Do not edit node_modules
by hand. When updating the pinned matcher, review the version guard, consumer
compatibility tests and lockfile together. Remove the export adapter when the
lint plugins support the current upstream CommonJS API directly.

Verify from a clean checkout with:

```sh
npm ci
npm audit
npm ls minimatch
npm run lint
npm test
npm run build
```

The compatibility tests exercise actual React, accessibility and import lint
rules, glob matching on Windows-style paths, idempotent installation and bounded
processing of an amplifying glob pattern. They do not send emails or access
production services.

The update also resolves existing lint errors: internal links use Next Link,
service selection reads a hydration-safe URL snapshot instead of setting state
synchronously in an effect, and an email-test local variable no longer shadows
`module`. The visual design and animation assets are unchanged.

## Verification on 2026-10-31

- Clean `npm ci` completed and automatically applied the export adapter.
- Full `npm audit`: 0 vulnerabilities, including development dependencies.
- `npm ls minimatch`: all consumers resolved to 11.0.3 without invalid entries.
- `npm test`: 34 passed, 0 failed.
- `npm run lint`: 0 errors; 13 existing warnings remain.
- `npm run build`: production compilation, TypeScript and all 16 static pages passed.
- Browser: Shopify service selection survived client navigation and a fresh page
  load; email preview preserved all test details, focused the result card and
  produced matching email/Gmail links. No email was sent and no application
  console errors were observed.

These are local verification results. Hostinger's alerts can be confirmed as
resolved only after this patch is pushed, deployed and scanned there.
