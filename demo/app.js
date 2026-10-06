import { buildAttention001V05, validateAttention001V05Plan } from "../src/experiments/attention-001-v0.5.js";

const button = document.querySelector("#generate");
const output = document.querySelector("#output");

button.addEventListener("click", () => {
  const seed = crypto.getRandomValues(new Uint32Array(1))[0];
  const plan = buildAttention001V05(seed);
  const validation = validateAttention001V05Plan(plan);
  output.textContent = JSON.stringify({
    seed,
    trainedLocation: plan.trainedLocation,
    controlLocation: plan.controlLocation,
    trialCount: plan.trials.length,
    validation,
    firstFiveTrials: plan.trials.slice(0, 5),
  }, null, 2);
});
