# Release process

## Normal website release
1. Make focused changes on a branch when practical.
2. Run validation, lint, typecheck and build.
3. Review product/claims/pre-launch implications.
4. Merge to main only when checks pass.
5. Confirm Vercel deployment success.
6. Smoke-check homepage, shop, one product, journal, contact and sitemap.

## Commercial-impact change
Any change involving price, availability, checkout, shipping countries, supplier identity or product origin also requires:
- product-data review
- commercial/landed-cost review
- compliance review
- policy review where relevant

## Rollback
Use the last known-good Git commit / Vercel deployment. Do not “fix forward” a broken production checkout while customers can transact.
