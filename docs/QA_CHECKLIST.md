# Website QA checklist

## Functional
- homepage loads
- mobile menu works
- search filters work
- product links resolve
- dynamic content pages resolve
- enquiry form validates
- enquiry error and bot branches pass the production-mode HTTP contract suite
- fallback email path works
- sitemap/robots/feed/API endpoints respond
- structured-data URLs stay on the canonical site origin
- indexed pages have one H1/main landmark and complete social metadata
- canonical apex host responds over HTTPS
- previews are noindex while production remains indexable
- `www` redirects to the canonical apex host
- `/api/health` returns `ok: true`

## Content
- one public email only
- no fake heritage
- no unsupported health claims
- pre-launch status visible
- prices clearly planned where not final
- origin/verification language accurate

## UX
- keyboard focus visible
- mobile overflow checked
- no placeholder links
- forms have labels
- search result counts are announced to assistive technology
- error/empty states usable

## Technical
- validation green
- canonical-domain validation green
- lint green
- typecheck green
- next build green
- local production HTTP smoke green
- every sitemap URL renders 200 with title, H1, canonical and no accidental noindex
- indexed pages expose lang, meta description, skip navigation and parseable JSON-LD
- indexed page titles are unique
- Vercel deployment green
- production smoke check green
- TLS certificate has at least 7 days remaining
- security.txt has at least 30 days remaining
- every registered legacy redirect works and its target returns 200
- scheduled production monitor workflow present and validated
