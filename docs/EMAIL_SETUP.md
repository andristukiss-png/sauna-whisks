# Enquiry email setup

The public email is:

info@SaunaWhisks.com

## Current behavior
The website posts enquiry forms to /api/enquiry.

If any direct-delivery variable is missing or invalid — RESEND_API_KEY, ENQUIRY_TO_EMAIL or ENQUIRY_FROM_EMAIL — the client falls back to opening the visitor's email app. The application does not use Resend's onboarding sender as a production fallback.

Malformed field types are rejected with a 400 response before sanitization or provider logic. The public form sends all enquiry fields as strings.

## Vercel environment variables
- RESEND_API_KEY
- ENQUIRY_TO_EMAIL=info@SaunaWhisks.com
- ENQUIRY_FROM_EMAIL=Sauna Whisks <website@SaunaWhisks.com>

## Before enabling direct delivery
1. Create/choose the transactional email account.
2. Verify SaunaWhisks.com as a sending domain.
3. Add DNS records supplied by the provider.
4. Add all three variables in Vercel Production and Preview as appropriate. Do not add RESEND_API_KEY alone.
5. Redeploy.
6. Send test enquiries from multiple email providers.
7. Confirm Reply-To goes to the visitor.
8. Confirm spam filtering is acceptable.
