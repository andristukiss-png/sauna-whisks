# Contributing

## Before changing content
- Keep the brand pre-launch unless launch gates are deliberately removed.
- Do not invent supplier, harvest, origin or company-history claims.
- Use info@SaunaWhisks.com as the only public email.
- Avoid unsupported health claims.
- Prefer existing routes over near-duplicate SEO pages.

## Site identity

Use `config/site.json` as the source of truth for the canonical origin, hostnames and public contact in runtime configuration, APIs, feeds and structured data. Do not introduce new hard-coded copies of those values in machine-readable output.

## Repository hygiene

- Never commit `.env` files, Vercel state, build output, coverage, caches, debug logs or private-key material. Use `.env.example` for documented variable names only.
- `npm run validate:hygiene` checks tracked files rather than the working directory, so generated dependencies/build output do not create false positives.

## Runtime

Use Node 22. Run `nvm use` (or use a tool that honors `.node-version`), then install the committed dependency graph with `npm ci`. Do not delete or hand-edit `package-lock.json`. The root lockfile dependency sets, version and Node engine must stay synchronized with `package.json`.

## Workflow supply chain

All external GitHub Actions in `.github/workflows` must be pinned to full commit SHAs. Keep the human-readable major version comment next to the pin, and let Dependabot propose updates. Checkout steps must use `persist-credentials: false` unless a workflow explicitly needs to push.

Dependabot intentionally does not open npm semver-major updates. Major framework, runtime, lint or type-system upgrades require a dedicated migration branch with release notes reviewed and the full Build/CodeQL/Vercel gates passing.

## Required checks
Run:

```bash
npm run check
```

This covers validation, lint, TypeScript and the production Next.js build. CI additionally audits production dependencies, runs CodeQL, boots the production server and runs HTTP smoke tests.

## Next.js boundaries

- Keep Client Components synchronous at the component boundary.
- Do not import Node.js or `next/headers` APIs into `"use client"` modules.
- Dynamic App Router pages use async `params` / `searchParams` on Next.js 16.
- Do not add legacy `middleware.ts`; Next.js 16 uses `proxy.ts` when a request proxy is actually needed.

## Redirects

Redirects must remain local, direct, and single-hop. Add legacy paths to `config/redirects.json`; do not use protocol-relative destinations or chain one registered redirect through another.

## Metadata and structured data

- Use `pageMetadata()` for every non-home page, including pages that need a robots override.
- Render JSON-LD only through `components/StructuredData.tsx`; do not add direct `dangerouslySetInnerHTML` elsewhere.
- Build canonical URLs from `config/site.json`, not repeated host strings.

## Machine-readable routes

- Route-handler surfaces outside `app/api` (feeds, `llms.txt`, `humans.txt`, `security.txt`) are discovered automatically and must be listed in `lib/publicData.ts`.
- JSON machine routes use `publicJson`; text/XML machine routes use `publicText`.
- Next special routes `sitemap.xml` and `robots.txt` remain explicit registry entries and are validated separately.

## API routes

- Public GET routes under `app/api` are discovered automatically. Add every public route to `lib/publicData.ts`; CI rejects unregistered API surfaces.
- Public JSON/CSV routes must use the shared response helpers so cache, CORS and compatibility headers stay consistent.
- `/api/enquiry` is intentionally private, POST-only and excluded from the public-data registry.

## New routes
Route validators discover `app/**/page.tsx` automatically. Static indexable pages must appear in the sitemap; dynamic page families are checked for finite static params; rendered internal links must resolve directly without relying on legacy redirects.

When adding a meaningful public route:
- add metadata/canonical
- derive canonical JSON-LD URLs and site identity from `config/site.json`
- add sitemap coverage
- add search-index coverage if useful
- add internal links from an appropriate hub
- add route validation when it is a new dynamic/API family

## Pull requests
Keep changes focused and explain why the route/content is needed.
