# Public Release Checklist

Verified for v0.1.0 on 2026-10-06:

- [x] protocol and tests are reproducible
- [x] CI is green
- [x] no private participant rows are present
- [x] no production tokens, keys, passwords, or secrets are present
- [x] no private backend project IDs or internal workspace references are present
- [x] sample/demo data is synthetic, sanitized, or explicitly approved for publication
- [x] experiment claims match the evidence level
- [x] failed hypotheses are preserved as failures
- [x] license and NOTICE are present
- [x] security and privacy docs are current
- [x] public README accurately describes what is and is not included

Verification notes:
- CI workflow completed successfully on the public SHANX-SYSTEMS repository.
- The original sanitized public tree had already passed targeted secret/privacy scanning before transfer.
- Post-transfer changes (citation URL, changelog, release notes) were re-scanned for known private project IDs, private hosted-lab URL, internal Notion ID, owner-session UUIDs, common API-token patterns, JWTs and private-key material; no findings.
- ATTENTION-001 is explicitly documented as a methodology/reproducibility example, not universal proof.
