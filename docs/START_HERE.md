# Start Here

Human Systems Lab is open-source infrastructure for building small, reproducible human-systems experiments without forcing participants to manage files or research plumbing.

If this is your first visit, you do **not** need to understand the whole repository.

## The 10-minute path

### 1. Install

Requires Node.js 20+.

```bash
npm install
```

### 2. Verify the engine

```bash
npm test
```

The test suite should pass before you evaluate or change experiment behavior.

### 3. Run the local demo

```bash
npm run demo
```

Open:

`http://localhost:8080/demo/`

The public ATTENTION-001 v0.5 example runs locally. You do not need participant data or a SHANX account.

### 4. Look for one thing that creates friction

We are especially interested in:

- a setup step that is unclear;
- a confusing participant interaction;
- an accessibility problem;
- an unexpected browser/runtime behavior;
- a reproducibility concern;
- a privacy/security concern;
- a place where the code or documentation makes an assumption it should state explicitly.

You do not need to solve the problem before reporting it.

### 5. Report evidence, not impressions alone

Use the **First-run feedback** or **Bug report** issue form.

A useful report says:

- what you tried;
- what you expected;
- what actually happened;
- environment/browser/runtime details when relevant;
- the smallest reproduction you can provide.

Please do **not** attach private participant data, credentials, tokens, raw SHANX owner sessions, or confidential datasets.

## Want to contribute code?

Read:

- [CONTRIBUTING.md](../CONTRIBUTING.md)
- [RESEARCH_INTEGRITY.md](../RESEARCH_INTEGRITY.md)
- [SECURITY.md](../SECURITY.md)

Keep changes narrow, auditable, and testable.

## Want to propose an experiment?

A new experiment should exist because something meaningful remains unresolved — not because the lab makes it easy to run another test.

Use the **Experiment proposal** issue form and state:

1. what existing evidence already establishes;
2. what remains unresolved;
3. why another experiment is justified;
4. whether the work is confirmatory or exploratory;
5. how failure will be preserved rather than explained away.

## First public mission

Run the demo once and report **one real friction point, ambiguity, or reproducibility concern**.

That is enough to help the project improve.
