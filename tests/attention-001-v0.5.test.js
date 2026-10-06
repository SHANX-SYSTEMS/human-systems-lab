import test from "node:test";
import assert from "node:assert/strict";
import { buildAttention001V05, validateAttention001V05Plan } from "../src/experiments/attention-001-v0.5.js";

test("same seed reproduces the same plan", () => {
  assert.deepEqual(buildAttention001V05(42), buildAttention001V05(42));
});

test("different seeds can change the plan", () => {
  assert.notDeepEqual(buildAttention001V05(42), buildAttention001V05(43));
});

test("500 deterministic plans satisfy protocol invariants", () => {
  for (let seed = 1; seed <= 500; seed += 1) {
    const result = validateAttention001V05Plan(buildAttention001V05(seed));
    assert.equal(result.ok, true, "seed " + seed + ": " + result.errors.join(", "));
  }
});

test("primary target distributions are exactly matched in baseline and transfer", () => {
  const plan = buildAttention001V05(991515834);
  const eligible = Array.from({ length: 8 }, (_, i) => i)
    .filter((i) => i !== plan.trainedLocation && i !== plan.controlLocation);

  for (const phase of ["baseline", "transfer"]) {
    for (const pos of eligible) {
      const trained = plan.trials.filter((t) => t.phase === phase && t.condition === "trained_location" && t.target_index === pos).length;
      const control = plan.trials.filter((t) => t.phase === phase && t.condition === "control_location" && t.target_index === pos).length;
      assert.equal(trained, 2);
      assert.equal(control, 2);
    }
  }
});
