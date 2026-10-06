# Security Policy

## Report vulnerabilities privately

Do not publish exploit details, active tokens, participant data, deployment secrets, or private research records in issues or pull requests.

## Security principles

- no service-role or secret credentials in browser code
- least privilege and deny-by-default access
- strict payload and protocol validation
- idempotent session submission
- replay/conflict detection
- append-only raw observations
- derived analysis stored separately
- payload size and rate limits
- offline queue integrity checks
- explicit sync receipts
- dependency review
- no silent collection of camera, microphone, precise location, contacts, passwords, financial credentials, or unrelated device data

## Public examples

Public examples must use synthetic data or data that has been explicitly approved for public release. Removing names is not, by itself, sufficient de-identification.
