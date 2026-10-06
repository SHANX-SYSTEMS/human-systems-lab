# SHANX Human Systems Lab

**Open-source infrastructure for low-friction, reproducible human-behavior experiments.**

Human Systems Lab is built around one participant loop:

**open → play → auto-save → verify receipt → analyze**

The goal is to remove repetitive file handling and one-off experiment wiring without weakening research integrity.

## Why

Serious behavioral experiments often become slower than they need to be because researchers repeatedly rebuild the same plumbing: seeded trial generation, local recovery, sync, validation, receipts, versioning and raw-versus-derived data separation.

Human Systems Lab turns those pieces into reusable infrastructure so experimental effort can stay focused on the actual question.

## Quick start

Requirements: Node.js 20+.

```bash
git clone https://github.com/shivpurohit460-lab/human-systems-lab.git
cd human-systems-lab
npm test
npm run demo
```

Then open:

```text
http://localhost:8080/demo/
```

The demo is local-only. It generates the sanitized ATTENTION-001 v0.5 protocol and sends no participant data anywhere.

## Included in v0.1

- deterministic seeded trial generation
- experiment protocol manifests
- browser IndexedDB storage helpers
- generic offline/sync queue abstraction
- JSON session-envelope schema
- reproducibility tests
- ATTENTION-001 v0.5 sanitized protocol example
- research-integrity rules
- security/privacy boundary
- local public demo

## Research law

> **Do not test what strong evidence already establishes. Test what the product, mechanism, or unresolved question still needs to know.**

A failed hypothesis remains a failed hypothesis. Raw observations stay separate from derived analysis.

See [RESEARCH_INTEGRITY.md](RESEARCH_INTEGRITY.md).

## Public / private boundary

This repository is intentionally public and sanitized.

It must never contain:
- private participant data
- raw private SHANX sessions
- production credentials or access tokens
- private infrastructure identifiers
- internal Notion references
- unpublished confidential research outputs

See [SECURITY.md](SECURITY.md).

## ATTENTION-001

ATTENTION-001 is included as a historical protocol lineage used to pressure-test the lab architecture.

It is an **example of experimental design and reproducibility**, not proof of a universal neuroscience mechanism.

See [protocols/attention-001/v0.5.manifest.json](protocols/attention-001/v0.5.manifest.json).

## Architecture

The intended production pattern is:

**approved experiment → deterministic client → local queue → bounded submission → immutable raw evidence → sync receipt → separately versioned analysis**

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) and [docs/EXPERIMENT_SPEC.md](docs/EXPERIMENT_SPEC.md).

## Contributing

Contributions are welcome, especially around reproducibility, accessibility, security, validators, experiment modules and backend adapters.

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Status

**v0.1 — open-source foundation**

This is an early research-engineering release. APIs and module contracts may change.

## License

Apache License 2.0. See [LICENSE](LICENSE) and [NOTICE](NOTICE).

## Citation

See [CITATION.cff](CITATION.cff).
