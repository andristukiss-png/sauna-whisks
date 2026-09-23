# Deployment

## Source of truth

- GitHub repository: `andristukiss-png/sauna-whisks`
- Production branch: `main`
- Vercel project: `sauna-whisks-main`
- Canonical production URL: `https://saunawhisks.com` (application source: `config/site.json`)
- `www.saunawhisks.com` redirects permanently to the canonical apex host.

The Vercel project is connected directly to the GitHub repository. Pushes to `main` are the production source; branches and pull requests should be treated as preview work.

## Runtime

Builds are pinned to Node 22 through `.nvmrc`, `.node-version`, `package.json#engines` and the GitHub Actions workflow.

## Before deploy

Run the full local quality gate:

```bash
npm run check
```

The gate includes canonical-domain configuration validation.

## Production variables

See `.env.example` and `docs/EMAIL_SETUP.md`.

## Domain ownership and DNS

`config/site.json` is the application source of truth for canonical identity. Vercel project Domain settings are authoritative for which hostnames are actually attached and which DNS targets Vercel currently expects.

The external DNS provider controls the public records. Do not guess or permanently document a project-specific CNAME target because Vercel may change the required target. When a domain issue occurs:

1. Confirm the production deployment is Ready.
2. Confirm both production hostnames are attached in Vercel.
3. Use the exact DNS values Vercel shows for those hostnames.
4. Preserve MX, SPF and DKIM records used for `info@SaunaWhisks.com`.
5. Confirm certificate state only after DNS validates.

See `docs/PRODUCTION_DIAGNOSTICS.md`.

## Preview indexing policy

Vercel preview deployments are intentionally non-indexable. Preview builds emit a global `X-Robots-Tag: noindex, nofollow, noarchive` and a disallow-all `robots.txt`. Production must not emit the global noindex header and must advertise the canonical sitemap.

## Verification after deploy

Run:

```bash
npm run verify:production
```

Then smoke-check:
- homepage
- `/shop`
- one product page
- `/journal`
- one article
- `/search`
- `/contact`
- `/api/health`
- `/sitemap.xml`
- `/robots.txt`
- `/feed.xml`
- mobile navigation

A source-code deployment can be green while DNS or TLS is still unhealthy. Treat those as separate layers during incident diagnosis.
