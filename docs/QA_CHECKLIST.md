# Website QA checklist

## Functional
- homepage loads
- mobile menu works
- search filters work
- product links resolve
- dynamic content pages resolve
- enquiry form validates
- fallback email path works
- sitemap/robots/feed/API endpoints respond
- canonical apex host responds over HTTPS
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
- scheduled production monitor workflow present and validated
