# Deployment

## Source of truth
GitHub: andristukiss-png/sauna-whisks
Branch: main

## Current caveat
The initial live project was created through Vercel Drop. The GitHub repository has moved far beyond that original snapshot.

## Target state
Connect the Vercel project directly to the GitHub repository so:
- main -> production deployments
- pull requests/branches -> preview deployments
- CI runs before merge
- rollback history maps to Git commits

## Production variables
See .env.example and docs/EMAIL_SETUP.md.

## Verification after deploy
- homepage
- /shop
- one product page
- /journal
- one article
- /search
- /contact
- /api/health
- /sitemap.xml
- /robots.txt
- /feed.xml
- mobile navigation
