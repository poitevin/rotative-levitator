import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
const files = new Map([
  ['index.html', 'text/html'], ['lectura.css', 'text/css'],
  ['lectura.js', 'text/javascript'], ['sonnets.mjs', 'text/javascript'],
  ['versos.mjs', 'text/javascript'],
]);
const port = Number(process.env.PORT || 8767);
createServer(async (request, response) => {
  const pathname = new URL(request.url, 'http://localhost').pathname;
  const file = pathname === '/' ? 'index.html' : pathname.slice(1);
  if (!files.has(file)) { response.writeHead(404).end('Not found'); return; }
  try {
    const body = await readFile(new URL(`../reader/${file}`, import.meta.url));
    response.writeHead(200, { 'Content-Type': `${files.get(file)}; charset=utf-8`, 'Cache-Control': 'no-store' });
    response.end(body);
  } catch {
    response.writeHead(500).end('Unable to read the requested file');
  }
}).listen(port, '127.0.0.1', () => console.log(`Reading edition: http://localhost:${port}`));
