# Recovery playbook

Use this when SaunaWhisks.com, a production deployment, or a critical integration is unhealthy.

## First: identify the failing layer

Do not change DNS, source code and environment configuration at the same time.

1. Record the current `main` commit SHA.
2. Check the Vercel production deployment for that commit.
3. Run:
   ```bash
   SAUNAWHISKS_EXPECTED_COMMIT=<git-sha> npm run verify:production
   ```
4. Compare the expected commit with the deployment identity returned by `/api/health`.
5. Classify the incident as one of:
   - application/deployment
   - DNS/TLS/domain attachment
   - environment/provider integration
   - external dependency/provider

## Application or deployment rollback

Use this when a specific code release caused the failure.

1. Identify the last known-good Git commit and Vercel deployment.
2. Prefer promoting/redeploying that known-good deployment or reverting the bad Git change.
3. Do not change DNS for an application-only failure.
4. After recovery, verify the live hostname against the restored commit:
   ```bash
   SAUNAWHISKS_EXPECTED_COMMIT=<known-good-sha> npm run verify:production
   ```
5. Confirm homepage, `/api/health`, feeds, security.txt and registered redirects.

## DNS, TLS or domain incident

Use this when source/deployment checks are green but the custom hostname is unhealthy.

1. Open Vercel → `sauna-whisks-main` → Settings → Domains.
2. Treat the DNS values shown there as authoritative for website records.
3. Check authoritative/public DNS and certificate state.
4. Change only the affected website records when necessary.
5. Preserve mail MX, SPF and DKIM records.
6. Do not roll back application code merely because DNS or TLS is unhealthy.

## Environment or provider incident

Use this when the application is healthy but an integration fails.

1. Check the required environment-variable contract in `.env.example` and the relevant setup document.
2. Correct variables in the deployment platform or provider; never commit secrets.
3. Redeploy only when the platform requires it.
4. For enquiry email, confirm the mailto fallback still works if direct delivery is unavailable.
5. Run the production smoke check after the provider/configuration change.

## After recovery

- Confirm Vercel reports production Ready.
- Run `npm run verify:production` with the expected commit when known.
- Confirm the scheduled production monitor is healthy.
- Record the root cause, recovery action and prevention change.
- Add or strengthen a validation/smoke check when the incident exposed a testable gap.

## Emergency principle

Restore a known-good state before attempting broad cleanup. Avoid simultaneous changes across code, DNS and provider configuration because they make the failing layer harder to identify.
