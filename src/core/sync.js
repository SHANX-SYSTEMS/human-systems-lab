import { deleteValue, getValue, listKeys, setValue } from "./storage.js";

export function createSyncQueue({ submit, prefix = "queue:" }) {
  async function enqueue(session) {
    const key = prefix + session.session.id;
    await setValue(key, session);
    return key;
  }

  async function syncOne(key) {
    const payload = await getValue(key);
    if (!payload) return null;
    const receipt = await submit(payload);
    await setValue("receipt:" + payload.session.id, receipt);
    await deleteValue(key);
    return receipt;
  }

  async function flush() {
    const keys = await listKeys(prefix);
    const results = [];
    for (const key of keys) {
      try {
        results.push({ key, ok: true, receipt: await syncOne(key) });
      } catch (error) {
        results.push({ key, ok: false, error: String(error) });
      }
    }
    return results;
  }

  return { enqueue, syncOne, flush };
}
