import { createServer } from 'node:http';
import { readFile, realpath, stat } from 'node:fs/promises';
import { dirname, extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

// Built-in Node.js only: localhost demo, no dependency install or production API.
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const rootReal = await realpath(root);
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
};
const rawPort = process.env.HSL_DEMO_PORT ?? '8080';
const port = Number(rawPort);
if (!Number.isInteger(port) || port < 0 || port > 65535) {
  throw new Error('HSL_DEMO_PORT must be an integer from 0 to 65535');
}
const within = (p) => p === rootReal || p.startsWith(rootReal + sep);

const server = createServer(async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }

  let path;
  try {
    const pathname = new URL(req.url ?? '/', 'http://localhost').pathname;
    path = decodeURIComponent(pathname);
  } catch {
    res.writeHead(400).end();
    return;
  }

  if (path === '/') {
    res.writeHead(302, { Location: '/demo/' }).end();
    return;
  }

  // The demo imports source modules; no need to serve private or hidden repo files.
  if (path.includes('\\') || path.includes('\0') || path.split('/').some((part) => part.startsWith('.')) ||
      !(path.startsWith('/demo/') || path.startsWith('/src/'))) {
    res.writeHead(404).end();
    return;
  }

  const target = resolve(root, '.' + path);
  if (!within(target)) {
    res.writeHead(404).end();
    return;
  }

  try {
    let file = target;
    const entryStat = await stat(file);
    if (entryStat.isDirectory()) file = resolve(file, 'index.html');
    if (!within(await realpath(file))) {
      res.writeHead(404).end();
      return;
    }
    const contentType = mime[extname(file)];
    if (!contentType) {
      res.writeHead(404).end();
      return;
    }
    const data = await readFile(file);
    res.writeHead(200, { 'Content-Type': contentType, 'Content-Length': data.length });
    res.end(req.method === 'HEAD' ? undefined : data);
  } catch (error) {
    if (error.code === 'ENOENT' || error.code === 'ENOTDIR') {
      res.writeHead(404).end();
      return;
    }
    console.error('Demo server error:', error);
    res.writeHead(500).end();
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`SHANX Human Systems Lab demo: http://127.0.0.1:${server.address().port}/demo/`);
});
