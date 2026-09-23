# SaunaWhisks.com

Next.js site for **SaunaWhisks.com** — a Latvia-based specialist brand and knowledge platform focused on sauna whisks, Baltic pirts culture and related sauna/banya traditions.

## Product / commercial

- `/` — brand homepage
- `/shop` — pre-launch collection
- `/shop/[slug]` — product detail
- `/shop/discovery-trio` — Birch + Oak + Eucalyptus bundle
- `/catalog` — transparent pre-launch product data
- `/compare` + `/compare/[slug]` — product/material comparisons
- `/finder` — consumer whisk finder
- `/guides` + `/guides/[slug]` — buying guides
- `/use-cases` + `/use-cases/[slug]` — home, venue, retail, builder, gifting and first-whisk use cases
- `/shipping` — availability / market status
- `/markets` + `/markets/[slug]` — launch-market plans

## Learning / authority

- `/learn` — learning hub
- `/beginners`
- `/materials` + `/materials/[slug]`
- `/conditions` + `/conditions/[slug]`
- `/care`
- `/techniques` + `/techniques/[slug]`
- `/traditions` + `/traditions/[slug]`
- `/journal` + `/journal/[slug]`
- `/journal/topics` + `/journal/topic/[slug]`
- `/glossary` + `/glossary/[slug]`
- `/faq` + `/faq/topic/[slug]`
- `/sources`
- `/editorial-policy`
- `/corrections`

## Quality / operations

- `/quality`
- `/standards`
- `/operations` + `/operations/[slug]`
- `/claims`
- `/checklist`
- `/tools/supplier-scorecard`

## Trade / supply

- `/trade` + `/trade/[slug]`
- `/trade/trial`
- `/wholesale`
- `/suppliers`
- `/suppliers/requirements`
- `/suppliers/sample-evaluation`
- `/partners`
- `/templates`

## Commercial tools

- `/tools`
- `/tools/landed-cost`
- `/tools/trade-demand`
- `/tools/launch-readiness`

## Company / trust

- `/company`
- `/about`
- `/press`
- `/status`
- `/contact`
- `/help`
- `/resources`
- `/site-map`
- `/legal`
- `/privacy`
- `/terms`
- `/returns`
- `/cookies`
- `/accessibility`

## Public data

- `/data`
- `/api`
- `/feed.xml`
- `/feed.json`
- `/llms.txt`
- `/humans.txt`
- `/.well-known/security.txt`
- `/sitemap.xml`
- `/robots.txt`

See `docs/PUBLIC_DATA.md` for the API/CSV surface.

Canonical site identity (`origin`, hostnames, public contact and country code) lives in `config/site.json`. Machine-readable output and runtime domain configuration derive from that file.

## Enquiries

Public contact:

**info@SaunaWhisks.com**

The form posts to `/api/enquiry` and includes:
- server-side validation
- honeypot spam field
- fast-submit bot signal
- same-origin check
- request-size / content-type checks
- request IDs
- outbound email timeout
- page-source context
- contextual enquiry fields
- mailto fallback if transactional delivery is not configured

Direct email delivery requires all three Vercel variables:

```
RESEND_API_KEY=...
ENQUIRY_TO_EMAIL=info@SaunaWhisks.com
ENQUIRY_FROM_EMAIL=Sauna Whisks <website@SaunaWhisks.com>
```

If any value is missing or invalid, the enquiry form stays on the mailto fallback instead of attempting partial transactional-email configuration.

## Development

Use Node 22. The repository pins the version in `.nvmrc` and `.node-version`.

```bash
nvm use
npm ci
npm run dev
```

Full quality gate:

```bash
npm run check
```

Canonical-domain configuration only:

```bash
npm run validate:domain
```

After a production deployment is Ready, verify public DNS/HTTPS/routes from a machine with public internet access:

```bash
npm run verify:production
```

See `docs/PRODUCTION_DIAGNOSTICS.md` for the domain/TLS incident playbook.

The CI pipeline uses the committed npm lockfile, runs validation, lint, TypeScript and the production Next.js build, then boots the built server and runs HTTP smoke tests.

## Commercial launch gates

Checkout remains disabled until these are resolved:

1. Verified supplier / producer details.
2. Exact product species and origin.
3. Product condition and preparation instructions.
4. Destination-market plant-product/import requirements for every SKU.
5. Final pricing and landed costs.
6. Fulfilment and shipping rules.
7. Legal company / VAT details.
8. Payment provider and commercial returns policy.
9. Transactional email domain verification.
10. End-to-end production test order.

## Brand principle

Publish what can be verified. Do not invent harvest dates, producer heritage, company history, health claims or geographic origin.
