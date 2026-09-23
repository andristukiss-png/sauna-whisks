# Product data standard

Every commercial SKU should eventually contain:

- Internal SKU
- Public product name
- Common botanical material
- Botanical species/group where verified
- Harvest country
- Harvest region where verified
- Production country
- Producer / partner
- Harvest season/date
- Preservation condition
- Approximate length
- Approximate weight
- Natural tolerance
- Handle description
- Preparation instructions
- Storage instructions
- Expected natural variation
- Leaf-retention test notes
- Wholesale unit cost
- Inbound freight allocation
- Packaging cost
- Fulfilment cost
- Retail price
- Import status by target market
- Batch/lot field
- Product photography status
- Customer-facing source/provenance notes

Unknown fields should remain unknown, not filled with marketing assumptions.

## Current pre-launch source files

- Core whisk records: `lib/products.ts`
- Discovery Trio bundle record: `lib/bundles.ts`
- Shared launch state and checkout gate: `lib/status.ts`

Customer-facing pages and public APIs should consume those shared records rather than copying planned prices, bundle membership or launch state.
