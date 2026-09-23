# Production domain diagnostics

Use this playbook when SaunaWhisks.com does not load, redirects incorrectly, or has an HTTPS/certificate problem.

## One-command smoke check

From a machine with public internet access:

```bash
npm run verify:production
```

To prove that the hostname is serving a specific deployment, pass an expected 7–40 character hexadecimal Git commit SHA:

```bash
SAUNAWHISKS_EXPECTED_COMMIT=<git-sha> npm run verify:production
```

The health endpoint exposes only safe deployment identity fields when Vercel provides them: environment and a 12-character commit prefix. It does not expose secrets or environment-variable values.

The command reports:
- TLS certificate protocol and expiry; production must negotiate TLS 1.2 or TLS 1.3, and less than 7 days remaining is a failure
- public A resolution for `saunawhisks.com`
- public CNAME resolution for `www.saunawhisks.com` when exposed by DNS
- homepage HTTP status, canonical/Open Graph identity, production indexability, CSP/HSTS policy and security headers
- `/api/health` status, deployment environment and commit prefix when available
- `/robots.txt`, `/sitemap.xml`, RSS and JSON feeds; versioned public machine routes are checked for their compatibility/CORS headers
- security.txt contact/canonical values and expiry; less than 30 days remaining is a failure
- every legacy redirect from `config/redirects.json` plus its destination
- the `www` redirect target and path/query preservation

Use a different host only when intentionally testing a preview or alternate production hostname. Alternate-host runs skip the canonical `www` DNS/redirect checks:

```bash
SAUNAWHISKS_BASE_URL=https://example.com npm run verify:production
```

## Diagnostic order

1. **Repository / deployment**
   - Confirm `main` contains the intended commit.
   - Confirm Vercel project `sauna-whisks-main` has a Ready production deployment for that commit.

2. **Vercel domain attachment**
   - Open Vercel → `sauna-whisks-main` → Settings → Domains.
   - Confirm both `saunawhisks.com` and `www.saunawhisks.com` are attached.
   - Treat the exact DNS target shown by Vercel there as authoritative for the project.

3. **Authoritative DNS**
   - Confirm the apex and `www` records resolve publicly.
   - Remove only conflicting website records for the same host when necessary.
   - Do not edit unrelated mail records while diagnosing the website.

4. **TLS / certificate**
   - If DNS resolves but HTTPS fails, inspect the certificate/domain state in Vercel.
   - A certificate cannot finish provisioning until the relevant hostname validates correctly.

5. **HTTP routing**
   - The monitor verifies that `www` redirects to the exact canonical origin and preserves non-root path/query values.
   - `https://saunawhisks.com/` should return a successful response.
   - `https://www.saunawhisks.com/` should redirect to the exact canonical apex origin and preserve the root path.
   - `/api/health` should return JSON with `ok: true`.

## Mail DNS safety

Website troubleshooting must not remove the Private Email records used by `info@SaunaWhisks.com`, including:
- MX records
- SPF TXT
- DKIM TXT

Only website records for `@` or `www` should be changed when Vercel explicitly requires it.

## Source configuration

The repository enforces the canonical host with:

```bash
npm run validate:domain
```

That validation checks the Next.js redirect, metadata, robots and sitemap configuration. It does not prove that public DNS or TLS is healthy; use `npm run verify:production` for the live environment.

## Automated production monitor

GitHub Actions runs `node scripts/production-smoke.mjs` against the canonical live site every six hours and on manual dispatch. Manual runs accept an optional expected commit SHA so an operator can verify exactly which deployment is serving the hostname. A failed monitor means the live DNS/HTTPS/HTTP path needs investigation even if the source branch itself is green.

For recovery procedures, see `docs/RECOVERY.md`.
