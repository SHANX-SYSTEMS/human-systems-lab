import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { readFile, writeFile, symlink, unlink, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildAttention001V05, validateAttention001V05Plan } from '../src/experiments/attention-001-v0.5.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

async function launch() {
  const child = spawn(process.execPath, ['demo/server.mjs'], {
    cwd: root,
    env: { ...process.env, HSL_DEMO_PORT: '0' },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  const ready = await new Promise((resolveReady, rejectReady) => {
    let stdout = '';
    let stderr = '';
    const timeout = setTimeout(() => rejectReady(new Error('Server startup timed out: ' + stderr)), 5000);
    child.stdout.on('data', (data) => {
      stdout += data;
      const match = stdout.match(/http:\/\/127\.0\.0\.1:(\d+)\/demo\//);
      if (match) {
        clearTimeout(timeout);
        resolveReady(`http://127.0.0.1:${match[1]}`);
      }
    });
    child.stderr.on('data', (d) => { stderr += d; });
    child.on('exit', (code) => {
      clearTimeout(timeout);
      rejectReady(new Error(`Demo exited before startup (${code}): ${stderr}`));
    });
  });
  return { child, origin: ready };
}

test('Node-only demo server serves expected public paths and rejects unsafe paths', async () => {
  const { child, origin } = await launch();
  try {
    const specs = [
      ['/demo/', 200, 'text/html', 'Local protocol demo'],
      ['/demo/index.html', 200, 'text/html', 'Local protocol demo'],
      ['/demo/app.js', 200, 'text/javascript', 'buildAttention001V05'],
      ['/demo/styles.css', 200, 'text/css', 'font-family'],
      ['/src/experiments/attention-001-v0.5.js', 200, 'text/javascript', 'totalTrials: 118'],
      ['/src/core/random.js', 200, 'text/javascript', 'export function mulberry32'],
      ['/README.md', 404, null, null],
      ['/demo/.env', 404, null, null],
      ['/src/not-here.js', 404, null, null],
      ['/../../etc/passwd', 404, null, null],
    ];
    for (const [path, expectedStatus, contentType, marker] of specs) {
      const response = await fetch(origin + path);
      assert.equal(response.status, expectedStatus, `${path}: HTTP status`);
      if (contentType) assert.match(response.headers.get('content-type'), new RegExp(contentType), `${path}: MIME`);
      if (marker) assert.ok((await response.text()).includes(marker), `${path}: content`);
      else await response.arrayBuffer();
    }
    // A symlink that points outside the repo must never become an arbitrary file server.
    const scratch = await mkdtemp(join(tmpdir(), 'hsl-symlink-test-'));
    const secret = join(scratch, 'secret.js');
    const symlinkPath = join(root, 'demo', 'outside-secret.js');
    try {
      await writeFile(secret, 'DO_NOT_LEAK_ANY_PRIVATE_DATA');
      await symlink(secret, symlinkPath);
      const escaped = await fetch(origin + '/demo/outside-secret.js');
      assert.equal(escaped.status, 404, 'out-of-root symlink rejected');
    } finally {
      await unlink(symlinkPath);
      await rm(scratch, { recursive: true, force: true });
    }
    // An alias inside the repository must not expose a normally unserved root file.
    const privateFile = join(root, 'HSL_SYNTHETIC_PRIVATE_CANARY.js');
    const internalAlias = join(root, 'demo', 'private-alias.js');
    try {
      await writeFile(privateFile, 'SYNTHETIC_TEST_ONLY_DO_NOT_DISCLOSE');
      await symlink(privateFile, internalAlias);
      const internalLeak = await fetch(origin + '/demo/private-alias.js');
      assert.equal(internalLeak.status, 404, 'in-root symlink alias rejected');
    } finally {
      await unlink(internalAlias);
      await unlink(privateFile);
    }
    const redirect = await fetch(origin + '/', { redirect: 'manual' });
    assert.equal(redirect.status, 302);
    assert.equal(redirect.headers.get('location'), '/demo/');
    const head = await fetch(origin + '/demo/', { method: 'HEAD' });
    assert.equal(head.status, 200);
    assert.equal((await head.text()).length, 0);
    const post = await fetch(origin + '/demo/', { method: 'POST' });
    assert.equal(post.status, 405);
    assert.equal(post.headers.get('allow'), 'GET, HEAD');
  } finally {
    child.kill('SIGTERM');
  }
});

test('seeded plan behaviour preserved for 100 seeds', () => {
  for (let seed = 0; seed < 100; seed += 1) {
    const a = buildAttention001V05(seed);
    const b = buildAttention001V05(seed);
    assert.deepEqual(a, b);
    assert.equal(a.trials.length, 118);
    assert.deepEqual(validateAttention001V05Plan(a), { ok: true, errors: [] });
  }
});

test('npm demo script no longer requires Python', async () => {
  const pkg = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'));
  assert.equal(pkg.scripts.demo, 'node demo/server.mjs');
});
