# Production domain diagnostics

Use this playbook when SaunaWhisks.com does not load, redirects incorrectly, or has an HTTPS/certificate problem.

## One-command smoke check

From a machine with public internet access:

```bash
npm run verify:production
```

The command reports:
- public A resolution for `saunawhisks.com`
- public CNAME resolution for `www.saunawhisks.com` when exposed by DNS
- homepage HTTP status
- `/api/health` status and payload
- `/robots.txt`
- `/sitemap.xml`
- the `www` redirect target

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
   - `https://saunawhisks.com/` should return a successful response.
   - `https://www.saunawhisks.com/` should redirect to the canonical apex host.
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
