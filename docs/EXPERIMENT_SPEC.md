# Experiment Module Specification

A Human Systems Lab experiment should be portable and auditable.

## Manifest

A minimal manifest should include:

```json
{
  "experiment_id": "ATTENTION-001",
  "version": "0.5",
  "status": "historical-example",
  "primary_outcome": "search_rt_ms",
  "preregistered_hypothesis": "<declared before observing results>"
}
```

## Session envelope

```json
{
  "schema_version": "human-lab-session-v0.1",
  "experiment": {
    "id": "ATTENTION-001",
    "version": "0.5",
    "protocol_hash": "<sha256>"
  },
  "session": {
    "id": "<uuid>",
    "seed": 123,
    "started_at": "<iso8601>",
    "completed_at": "<iso8601>",
    "app_version": "<version>",
    "input_mode": "pointer"
  },
  "awareness": {},
  "rows": []
}
```

## Backend validation

Do not validate only row count. Where practical, verify:
- allowed phases and condition labels
- expected balancing rules
- target/distractor collision constraints
- timing ranges
- response consistency
- protocol-specific invariants
- protocol hash
- idempotent session identity

## Reproducibility

Given the same experiment version and seed, assignment should reproduce exactly unless external randomness is intentionally used and recorded.

## Analysis separation

The protocol defines collection. Analysis versions are independent artifacts and must never rewrite raw observations.
