# Contributing

## Before changing content
- Keep the brand pre-launch unless launch gates are deliberately removed.
- Do not invent supplier, harvest, origin or company-history claims.
- Use info@SaunaWhisks.com as the only public email.
- Avoid unsupported health claims.
- Prefer existing routes over near-duplicate SEO pages.

## Required checks
Run:

```bash
npm run check
```

This covers validation, lint, TypeScript and the production Next.js build.

## New routes
When adding a meaningful public route:
- add metadata/canonical
- add sitemap coverage
- add search-index coverage if useful
- add internal links from an appropriate hub
- add route validation when it is a new dynamic/API family

## Pull requests
Keep changes focused and explain why the route/content is needed.
