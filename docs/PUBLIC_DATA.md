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

These endpoints do not imply commercial availability. Product catalog entries remain pre-launch until checkout is intentionally enabled.

## CSV safety

CSV cells are quoted and values beginning with spreadsheet formula prefixes (`=`, `+`, `-`, `@`) are neutralized before export. Keep new CSV endpoints on the shared `encodeCsv` / `publicCsv` helpers.
