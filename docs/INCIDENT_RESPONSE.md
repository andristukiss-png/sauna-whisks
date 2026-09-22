# Incident response

## Severity examples

### Critical
- checkout charging incorrectly
- exposure of customer data
- malicious code or credential compromise
- production site unavailable during commercial sales

### High
- enquiry form silently losing messages
- wrong product availability/origin shown
- broken payment or fulfilment integration
- production domain or TLS unavailable during pre-launch activity

### Medium
- broken content route
- incorrect internal link
- formatting/accessibility regression

## Response

1. Stop harmful transactions if necessary.
2. Preserve logs/evidence.
3. Determine the failing layer before changing configuration.
4. Roll back to a known-good deployment when the application release is the cause.
5. Patch and test.
6. Record what happened and the prevention action.

## Domain / TLS incident order

For a domain outage, diagnose in this order:

1. GitHub commit and Vercel production deployment.
2. Vercel project domain attachment.
3. Public authoritative DNS.
4. TLS/certificate state.
5. HTTP redirect and application routing.

Run `npm run verify:production` from a machine with public internet access and use `docs/PRODUCTION_DIAGNOSTICS.md` as the detailed playbook.

Do not repeatedly change DNS records without identifying which layer is failing. Do not remove MX, SPF or DKIM records while troubleshooting the website.

Security contact: info@SaunaWhisks.com
