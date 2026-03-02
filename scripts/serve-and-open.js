#!/usr/bin/env node
/**
 * Start local server and open the Create New Inventory prototype.
 * Uses Node only (no Python or npx). Tries ports 5555, 5556, 3333 if one is in use.
 * Usage: npm start   or   npm run dev
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORTS = [5555, 5556, 3333];
const ROOT = path.resolve(__dirname, '..');

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function createServer() {
  return http.createServer((req, res) => {
    let filePath = path.join(ROOT, req.url === '/' ? '/index.html' : req.url);
    filePath = path.normalize(filePath);
    if (!filePath.startsWith(ROOT)) {
      res.statusCode = 403;
      res.end('Forbidden');
      return;
    }
    fs.stat(filePath, (err, stat) => {
      if (err || !stat.isFile()) {
        res.statusCode = 404;
        res.end('Not Found');
        return;
      }
      const ext = path.extname(filePath);
      res.setHeader('Content-Type', MIME[ext] || 'application/octet-stream');
      fs.createReadStream(filePath).pipe(res);
    });
  });
}

function tryListen(portIndex) {
  if (portIndex >= PORTS.length) {
    console.error('  All ports ' + PORTS.join(', ') + ' are in use.');
    console.log('  Stop the other process or use: python3 -m http.server 5555\n');
    process.exit(1);
  }
  const port = PORTS[portIndex];
  const url = `http://localhost:${port}/prototypes/create-new-inventory/index.html`;
  const server = createServer();

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      tryListen(portIndex + 1);
    } else {
      console.error('  Server error:', err.message);
      process.exit(1);
    }
  });

  server.listen(port, '127.0.0.1', () => {
    const openCmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
    require('child_process').exec(`${openCmd} "${url}"`, () => {});
    console.log('\n  Prototype URL (copy if browser did not open):');
    console.log('  ' + url);
    console.log('\n  Server: http://127.0.0.1:' + port + '/');
    console.log('  Press Ctrl+C to stop.\n');
  });
}

tryListen(0);
