# SaunaWhisks.com

Next.js site for **SaunaWhisks.com** — a Latvia-based specialist brand and knowledge platform focused on sauna whisks, Baltic pirts culture and related sauna/banya traditions.

## Current architecture

### Commerce / product
- `/` — brand homepage
- `/shop` — collection
- `/shop/[slug]` — individual whisk pages
- `/shop/discovery-trio` — flagship Birch + Oak + Eucalyptus bundle
- `/compare` — material comparison
- `/shipping` — pre-launch shipping / market status
- `/wholesale` — trade/B2B intake
- `/suppliers` — producer / supplier intake
- `/partners` — press and industry partnerships

### Learning
- `/learn` — learning hub
- `/beginners` — first-whisk path
- `/materials` — material hub
- `/care` — preparation / storage / reuse hub
- `/traditions` — regional tradition overview
- `/journal` — searchable sauna knowledge library
- `/journal/[slug]` — evergreen guides
- `/glossary` — terminology
- `/standards` — sourcing/product standards
- `/faq` — buyer FAQ
- `/usa` — planned US launch landing page

### Company / trust
- `/about`
- `/contact`
- `/privacy`
- `/terms`
- `/returns`
- `/cookies`
- `/accessibility`

### Technical
- `/api/enquiry` — enquiry API
- `/api/health` — basic health endpoint
- `/feed.xml` — journal RSS
- `/.well-known/security.txt`
- `/robots.txt`
- `/sitemap.xml`

## Enquiry form

The site has one public contact address:

**info@SaunaWhisks.com**

The form posts to `/api/enquiry`. It includes:
- server-side validation
- honeypot spam field
- fast-submit bot signal
- request-size / content-type checks
- page-source context
- general topic routing
- wholesale business/country/volume fields
- mailto fallback if transactional delivery is not configured

Required Vercel environment variable for direct delivery:

```
RESEND_API_KEY=...
```

Optional:

```
ENQUIRY_TO_EMAIL=info@SaunaWhisks.com
ENQUIRY_FROM_EMAIL=Sauna Whisks <website@SaunaWhisks.com>
```

## SEO / discovery

Current implementation includes:
- dynamic sitemap
- robots directives
- RSS feed
- OpenGraph image
- product / article / FAQ / breadcrumb / organization / glossary structured data
- canonical URLs
- searchable journal
- internal topic hubs and related-content links

## Accessibility / security

Current implementation includes:
- skip-to-content
- visible keyboard focus
- reduced-motion support
- semantic form labels
- responsive navigation
- baseline security headers
- security.txt

## Development

```bash
npm install
npm run dev
```

Production check:

```bash
npm run build
```

GitHub Actions runs the build automatically on pushes and pull requests.

## Deployment

Designed for Vercel.

The first public Vercel project was created with Vercel Drop. GitHub is the source of truth and is now substantially ahead of that original Drop snapshot. The live Vercel project should ultimately be linked directly to this repository so `main` deploys automatically.

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

## Brand principle

Publish what can be verified. Do not invent harvest dates, producer heritage, company history, health claims or geographic origin.
