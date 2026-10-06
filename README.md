# SHANX Human Systems Lab

**Open-source infrastructure for low-friction, reproducible human-behavior experiments.**

Human Systems Lab turns the participant workflow into:

**open → play → auto-save → verify receipt → analyze**

The goal is to remove repetitive file handling and one-off experiment wiring without weakening research integrity.

## Start here

New to the project? Follow the [10-minute first-run path](docs/START_HERE.md).

Our first public participation mission is open in [Issue #3](https://github.com/SHANX-SYSTEMS/human-systems-lab/issues/3): run the local demo once and report **one real friction point, ambiguity, accessibility problem, or reproducibility concern**.

You do not need to contribute code to contribute useful evidence.

## Why this exists

Research software often forces participants and builders to manage files, versions, exports, and bespoke experiment pages. Human Systems Lab separates the participant experience from the evidence machinery.

Participants should experience a small, clear mission. Underneath, the protocol remains deterministic, auditable, versioned, and falsifiable.

## Quick start

Requires Node.js 20+.

```bash
npm install
npm test
npm run demo
```

Then open:

`http://localhost:8080/demo/`

The demo generates the public ATTENTION-001 v0.5 protocol locally. No participant data is required.

## Repository map

- `src/core/` — deterministic randomization, local storage, sync queue
- `src/experiments/` — public experiment modules
- `protocols/` — manifests and protocol lineage
- `schemas/` — public session schemas
- `tests/` — reproducibility and invariant checks
- `demo/` — local browser demo
- `docs/` — architecture, experiment specification, and newcomer guidance
- `RESEARCH_INTEGRITY.md` — evidence and failure rules
- `SECURITY.md` — security boundary

## What is public

- experiment-engine primitives
- deterministic trial generation
- protocol manifests
- local/offline queue patterns
- sync-receipt patterns
- protocol-validation examples
- reproducibility tests
- research-integrity rules
- security/privacy guidance
- synthetic and sanitized examples

## What is not public

This repository must never contain private participant data, raw SHANX owner sessions, production credentials, access tokens, private infrastructure identifiers, internal Notion references, or unpublished confidential research outputs.

## Core research law

> **Do not test what strong evidence already establishes. Test what the product, mechanism, or unresolved question still needs to know.**

A failed hypothesis remains a failed hypothesis. Raw observations stay separate from derived analysis.

## ATTENTION-001

The first public example is the ATTENTION-001 protocol lineage used to pressure-test the lab architecture.

It is included as a methodology and reproducibility example — **not as proof of a universal neuroscience mechanism**.

## Contributing

Start with [START_HERE.md](docs/START_HERE.md), [CONTRIBUTING.md](CONTRIBUTING.md), [RESEARCH_INTEGRITY.md](RESEARCH_INTEGRITY.md), and [SECURITY.md](SECURITY.md).

GitHub issue forms are available for:

- first-run feedback;
- reproducible bug reports;
- bounded experiment proposals.

## License

Apache License 2.0. See [LICENSE](LICENSE).

The license does not grant rights to SHANX SYSTEMS trademarks beyond customary attribution and origin-description uses described by the license.
