# SaunaWhisks.com

Next.js site for **SaunaWhisks.com** — a Latvia-based specialist brand and knowledge platform focused on sauna whisks, Baltic pirts culture and related sauna/banya traditions.

## Current architecture

- `/` — brand homepage
- `/shop` — collection
- `/shop/[slug]` — product detail pages
- `/traditions` — regional tradition overview
- `/journal` — sauna knowledge library
- `/journal/[slug]` — evergreen guides
- `/glossary` — terminology
- `/standards` — sourcing/product standards
- `/faq` — buyer FAQ + structured data
- `/usa` — planned US launch landing page
- `/about` — brand direction
- `/wholesale` — trade/B2B
- `/contact` — contact details

## Development

```bash
npm install
npm run dev
```

Build check:

```bash
npm run build
```

GitHub Actions runs the build automatically on pushes and pull requests.

## Deployment

Designed for Vercel.

The first public Vercel project was created with Vercel Drop. The next infrastructure step is to connect this GitHub repository directly to the Vercel project so pushes to `main` deploy automatically.

## Commercial launch gates

Do not enable checkout until these are resolved:

1. Verified supplier / producer details.
2. Exact product species and origin.
3. Product condition and preparation instructions.
4. US/EU import and plant-product requirements for each SKU.
5. Final pricing and landed costs.
6. Fulfilment and shipping rules.
7. Legal company / VAT details.
8. Payment provider and returns policy.

## Brand principle

Publish what can be verified. Do not invent harvest dates, producer heritage, company history, health claims or geographic origin.
