# Architecture

## Participant experience

The intended UX is:

**one permanent link → current approved mission → play → local save → automatic sync → receipt**

The participant should not need to export CSV or JSON during normal use.

## Client responsibilities

- render the approved experiment module
- generate deterministic trial assignments from a seed
- capture timing and responses
- validate local completeness
- queue in-progress and unsynced sessions locally
- retry automatically after reconnection
- show cloud-saved state only after a verified receipt
- preserve app version and protocol hash

## Backend responsibilities

Recommended logical entities:

- experiment
- pseudonymous participant identity
- session
- trial
- sync receipt
- analysis run

Raw session, trial, and receipt records should be append-only or mutation-blocked. Derived analyses should be separately versioned.

## Deployment boundary

The open-source client uses configuration for backend endpoints. Production credentials, private project IDs, and secret keys must never be committed.

## Game layer

Allowed:
- progress
- rounds
- completion feedback
- lightweight curiosity/reveal
- optional user-controlled sound or haptics

Avoid:
- variable-reward loops
- pressure to keep playing
- performance shaming
- hidden mechanics that contaminate the scientific manipulation

## Experiment engine

Each experiment module should expose:
- metadata
- version
- protocol hash
- research question
- preregistered or exploratory status
- trial generator
- validation rules
- participant instructions
- raw event schema
- completion criteria
