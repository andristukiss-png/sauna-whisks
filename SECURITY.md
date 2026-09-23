# Security policy

For security issues affecting SaunaWhisks.com, contact:

**info@SaunaWhisks.com**

Please include:
- affected URL or component
- reproduction steps
- expected vs actual behavior
- impact if known

Do not include credentials or private customer information in a public GitHub issue.

The public security contact is also available at:

`/.well-known/security.txt`

## Automated checks

The repository runs production dependency auditing, CodeQL analysis, security/header validation, and production-mode HTTP smoke tests in CI. Security-sensitive changes should remain behind these gates before merge.
