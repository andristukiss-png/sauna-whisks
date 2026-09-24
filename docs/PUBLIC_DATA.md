# Public data endpoints

SaunaWhisks.com exposes read-only pre-launch data for transparency and internal/external tooling.

## Core
- /api — endpoint index
- /api/status
- /api/health
- /api/company

## Catalog
- /api/catalog
- /api/catalog.csv

## Content and search
- /api/articles
- /api/search?q=birch
- /api/faq
- /api/traditions
- /api/comparisons
- /api/editorial

## Knowledge data
- /api/materials
- /api/conditions
- /api/glossary
- /api/guides
- /api/operations
- /api/use-cases
- /api/techniques
- /api/tools
- /api/sources
- /api/sources.csv

## Commercial planning
- /api/markets
- /api/trade

## Templates
- /api/product-data-template.csv
- /api/supplier-sample-template.csv
- /api/trade-trial-template.csv

## Machine-readable support
- /feed.xml
- /feed.json
- /llms.txt
- /humans.txt
- /.well-known/security.txt
- /sitemap.xml
- /robots.txt

The canonical endpoint registry lives in `lib/publicData.ts`. The `/data` page and `/api` index both render from that registry.

The source page and both source APIs use `lib/sources.ts`, which deduplicates the citations from `lib/articles.ts` by URL.

These endpoints do not imply commercial availability. Product catalog entries remain pre-launch until checkout is intentionally enabled. Public status fields derive from `lib/status.ts`; Discovery Trio catalog data derives from `lib/bundles.ts`.

## CSV safety

CSV cells are quoted and values beginning with spreadsheet formula prefixes (`=`, `+`, `-`, `@`) are neutralized before export. Keep new CSV endpoints on the shared `encodeCsv` / `publicCsv` helpers.


## Crawler policy

Public API routes are deliberately excluded from crawler indexing with both `robots.txt` (`Disallow: /api`) and API-level `X-Robots-Tag` headers. They remain directly accessible as read-only public data.

## Compatibility version

Shared public JSON, CSV, text and feed responses include:

```
X-SaunaWhisks-Data-Version: 2
```

The header is exposed through CORS so browser-based tooling can read it. Version changes are reserved for intentional compatibility changes to the public machine-data contract; ordinary content updates do not require a version bump. Version 2 introduces the standards-specific `application/feed+json` media type for `/feed.json`. Sitemap and robots metadata routes are outside this shared response-helper contract.
