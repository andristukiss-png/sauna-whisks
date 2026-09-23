# Release process

## Normal website release

1. Make focused changes on a branch when practical.
2. Run validation, lint, typecheck and build.
3. Review product/claims/pre-launch implications.
4. Merge to `main` only when checks pass.
5. Confirm the Vercel production deployment is Ready.
6. Run the production smoke check.
7. Smoke-check homepage, shop, one product, journal, contact and sitemap.

## Commercial-impact change

Any change involving price, availability, checkout, shipping countries, supplier identity or product origin also requires:
- product-data review
- commercial/landed-cost review
- compliance review
- policy review where relevant

## Rollback

Use the last known-good Git commit / Vercel deployment. Do not “fix forward” a broken production checkout while customers can transact.

A domain or TLS incident is not automatically an application-release failure. Diagnose deployment, domain attachment, DNS, certificate state and HTTP routing separately before rolling back source code.

Use `docs/RECOVERY.md` for application rollback, DNS/TLS recovery and provider/environment incidents.

## Continuous production verification

The scheduled production monitor checks the live canonical domain every six hours, including DNS/TLS, core machine endpoints, registered redirects, security.txt, and deployment identity. By default the expected deployment is the current `main` commit.

## Verification commands

Before treating a release as deployable:

```bash
npm run check
```

CI then starts the built production server with `npm start` and runs `npm run smoke:local` against real HTTP responses before the branch is considered green. The smoke suite crawls every URL advertised in `sitemap.xml` and verifies runtime status, title, H1, canonical metadata and indexability.

After the production deployment is Ready:

```bash
npm run verify:production
```

A release is considered technically green only when:
- custom validation passes
- ESLint passes
- TypeScript passes
- `next build` passes
- Vercel reports the deployment Ready
- the production smoke check passes for the canonical host and `www` redirect
- live TLS/security.txt/redirect checks pass
- scheduled live production monitor remains enabled
