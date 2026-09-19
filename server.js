// Tiny dependency-free localhost server for testing Voice Notes on desktop.
// Run: node server.js
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const root = __dirname;
const port = Number(process.env.PORT || 8080);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(url.pathname);
  if (pathname === '/') pathname = '/index.html';
  const file = path.resolve(root, '.' + pathname);
  if (!file.startsWith(root + path.sep)) {
    res.writeHead(403).end('Forbidden');
    return;
  }
  fs.stat(file, (statErr, stat) => {
    if (statErr || !stat.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Not found');
      return;
    }
    const headers = {
      'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': pathname === '/sw.js' || pathname === '/index.html' ? 'no-cache' : 'public, max-age=3600'
    };
    res.writeHead(200, headers);
    fs.createReadStream(file).pipe(res);
  });
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Voice Notes is running at http://localhost:${port}/`);
  console.log('Keep this window open while testing. Press Ctrl+C to stop.');
});
