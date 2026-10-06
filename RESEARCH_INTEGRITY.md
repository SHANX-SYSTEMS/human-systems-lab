# Research Integrity

Human Systems Lab is infrastructure for falsifiable experiments. It is not a truth machine.

## Required experiment metadata

Every serious experiment should declare:

- experiment ID and version
- protocol hash
- research question
- preregistered primary hypothesis, or explicit exploratory/null status
- primary outcome
- trial-generation logic
- inclusion/exclusion rules
- stopping rule
- planned robustness checks
- known limitations

## Evidence levels

1. **Established external evidence** — supported by strong literature; do not needlessly re-prove.
2. **Exploratory probe** — generates questions; does not justify broad claims.
3. **Preregistered internal experiment** — hypothesis declared before observing results.
4. **Replication** — same protocol tested again, ideally counterbalanced.
5. **Mechanism discrimination** — competing explanations are explicitly separated.
6. **Product validation** — tests a specific interface, workflow, or behavior.
7. **General claim** — requires evidence beyond a single owner or convenience sample.

## Failure policy

A failed hypothesis remains a failed hypothesis. Do not rename an unexpected result after seeing it merely to rescue the original theory.

## Raw versus derived data

Raw observations are immutable. Cleaning, exclusions, transformations, summary statistics, model outputs, and interpretations belong in separately versioned analysis artifacts.
