import { maxStreak, mulberry32, shuffle } from "../core/random.js";

export const ATTENTION_001_V05 = Object.freeze({
  experimentId: "ATTENTION-001",
  version: "0.5",
  totalTrials: 118,
  primaryOutcome: "search_rt_ms",
  question: "Does high-probability distractor training change later search cost at the trained location relative to a matched control location?",
  primaryHypothesis: "(transfer median trained-control) - (baseline median trained-control) < 0",
});

const PAIRS = [[0, 3], [1, 2], [4, 7], [5, 6]];
const ROTATIONS = [0, 90, 180, 270];

function makeMeasuredPhase(name, trained, control, trainedPrimary, controlPrimary, fillerCount, random) {
  const eligible = Array.from({ length: 8 }, (_, i) => i).filter((i) => i !== trained && i !== control);
  const rows = [];
  const trainedRepeats = trainedPrimary / eligible.length;
  const controlRepeats = controlPrimary / eligible.length;

  if (!Number.isInteger(trainedRepeats) || !Number.isInteger(controlRepeats) || fillerCount % 2 !== 0) {
    throw new Error("Invalid balancing specification");
  }

  for (const target of eligible) {
    for (let i = 0; i < trainedRepeats; i += 1) {
      rows.push({ target, distractor: trained, condition: "trained_location" });
    }
    for (let i = 0; i < controlRepeats; i += 1) {
      rows.push({ target, distractor: control, condition: "control_location" });
    }
  }

  const fillerTargets = shuffle(
    [...Array(fillerCount / 2).fill(trained), ...Array(fillerCount / 2).fill(control)],
    random,
  );

  const fillerDistractors = [];
  const q = Math.floor(fillerCount / eligible.length);
  const remainder = fillerCount % eligible.length;
  for (const position of eligible) {
    for (let i = 0; i < q; i += 1) fillerDistractors.push(position);
  }
  fillerDistractors.push(...shuffle(eligible, random).slice(0, remainder));
  const shuffledDistractors = shuffle(fillerDistractors, random);

  fillerTargets.forEach((target, i) => {
    rows.push({ target, distractor: shuffledDistractors[i], condition: "filler_pair_target" });
  });

  let ordered = rows;
  for (let attempt = 0; attempt < 300; attempt += 1) {
    ordered = shuffle(rows, random);
    if (maxStreak(ordered.map((row) => row.condition)) <= 3) break;
  }

  const blockSize = ordered.length / 4;
  return ordered.map((row, index) => ({
    phase: name,
    block: 1 + Math.floor(index / blockSize),
    condition: row.condition,
    target_index: row.target,
    tlike_index: row.distractor,
    salient_index: row.distractor,
    salient_type: "target_like",
  }));
}

export function buildAttention001V05(seed) {
  const random = mulberry32(seed);
  const pair = PAIRS[Math.floor(random() * PAIRS.length)];
  const trained = random() < 0.5 ? pair[0] : pair[1];
  const control = trained === pair[0] ? pair[1] : pair[0];

  const practice = Array.from({ length: 6 }, () => {
    const target = Math.floor(random() * 8);
    let distractor = Math.floor(random() * 8);
    while (distractor === target) distractor = Math.floor(random() * 8);
    return {
      phase: "practice",
      block: 0,
      condition: "practice",
      target_index: target,
      tlike_index: distractor,
      salient_index: distractor,
      salient_type: "target_like",
    };
  });

  const raw = [
    ...practice,
    ...makeMeasuredPhase("baseline", trained, control, 12, 12, 8, random),
    ...makeMeasuredPhase("training", trained, control, 24, 12, 12, random),
    ...makeMeasuredPhase("transfer", trained, control, 12, 12, 8, random),
  ];

  const trials = raw.map((trial) => ({
    ...trial,
    fixation_ms: 360 + Math.floor(random() * 260),
    cells: Array.from({ length: 8 }, (_, index) => {
      if (index === trial.target_index) return { kind: "T", rotation: 0 };
      if (index === trial.tlike_index) return { kind: "T", rotation: 90 };
      return { kind: "L", rotation: ROTATIONS[Math.floor(random() * ROTATIONS.length)] };
    }),
  }));

  return { seed, trainedLocation: trained, controlLocation: control, trials };
}

export function validateAttention001V05Plan(plan) {
  const { trainedLocation: trained, controlLocation: control, trials } = plan;
  const errors = [];

  if (trials.length !== 118) errors.push("expected 118 total trials");

  const measured = trials.filter((trial) => trial.phase !== "practice");
  const byPhase = Object.groupBy
    ? Object.groupBy(measured, (trial) => trial.phase)
    : measured.reduce((acc, trial) => ((acc[trial.phase] ||= []).push(trial), acc), {});

  const expectedSizes = { baseline: 32, training: 48, transfer: 32 };
  for (const [phase, expected] of Object.entries(expectedSizes)) {
    if ((byPhase[phase] || []).length !== expected) errors.push(phase + " size mismatch");
  }

  for (const trial of trials) {
    if (trial.target_index === trial.tlike_index) errors.push("target/distractor collision");
    if (trial.salient_index !== trial.tlike_index) errors.push("salient index mismatch");
  }

  const eligible = Array.from({ length: 8 }, (_, i) => i).filter((i) => i !== trained && i !== control);
  for (const phase of ["baseline", "transfer"]) {
    for (const condition of ["trained_location", "control_location"]) {
      const rows = (byPhase[phase] || []).filter((trial) => trial.condition === condition);
      for (const pos of eligible) {
        if (rows.filter((trial) => trial.target_index === pos).length !== 2) {
          errors.push(phase + " " + condition + " target matching failed at " + pos);
        }
      }
    }
  }

  return { ok: errors.length === 0, errors };
}
