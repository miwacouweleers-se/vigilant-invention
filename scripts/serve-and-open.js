#!/usr/bin/env node
/**
 * Start local server and open the Create New Inventory prototype.
 * Uses Node only (no Python or npx). Tries 3456, 5555, 5556, 3333, 5557, 5558. If all in use, finds a working port and opens it.
 * Usage: npm start | npm run dev
 *        node scripts/serve-and-open.js --no-open   (start server only, do not open browser)
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

// Prefer a high port to avoid conflict with macOS "Personal Agent" (5555) and Freeciv (5556)
const PORTS = [3456, 5555, 5556, 3333, 5557, 5558];
const ROOT = path.resolve(__dirname, '..');
const PROTOTYPE_PATH = '/prototypes/create-new-inventory/index.html';

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
    const pathname = (req.url || '/').split('?')[0].split('#')[0];
    let filePath = path.join(ROOT, pathname === '/' ? '/index.html' : pathname);
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

function openBrowser(url) {
  if (process.argv.includes('--no-open')) return;
  const openCmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
  require('child_process').exec(`${openCmd} "${url}"`, () => {});
}

function probePort(port, cb) {
  const req = http.get(`http://127.0.0.1:${port}${PROTOTYPE_PATH}`, (res) => {
    cb(res.statusCode === 200 ? port : null);
  });
  req.on('error', () => cb(null));
  req.setTimeout(800, () => { req.destroy(); cb(null); });
}

function tryOpenWorkingPort(portIndex, cb) {
  if (portIndex >= PORTS.length) return cb(null);
  probePort(PORTS[portIndex], (ok) => {
    if (ok) return cb(ok);
    tryOpenWorkingPort(portIndex + 1, cb);
  });
}

function tryListen(portIndex) {
  if (portIndex >= PORTS.length) {
    console.log('  All ports ' + PORTS.join(', ') + ' are in use.');
    console.log('  Checking which port is serving the prototype...\n');
    tryOpenWorkingPort(0, (port) => {
      const url = port
        ? `http://localhost:${port}${PROTOTYPE_PATH}`
        : `http://localhost:${PORTS[0]}${PROTOTYPE_PATH}`;
      if (port) console.log('  Found server on port ' + port + '. Opening browser.\n');
      else console.log('  Could not find a running server. Opening port ' + PORTS[0] + ' (copy URL and try again if it fails).\n');
      openBrowser(url);
      console.log('  Prototype URL (copy if browser did not open):');
      console.log('  ' + url + '\n');
      process.exit(0);
    });
    return;
  }
  const port = PORTS[portIndex];
  const url = `http://localhost:${port}${PROTOTYPE_PATH}`;
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
    openBrowser(url);
    console.log('\n  Prototype URL (copy if browser did not open):');
    console.log('  ' + url);
    console.log('\n  Server: http://127.0.0.1:' + port + '/');
    console.log('  Press Ctrl+C to stop.\n');
  });
}

// Verify prototype exists before starting
const prototypeIndex = path.join(ROOT, 'prototypes', 'create-new-inventory', 'index.html');
if (!fs.existsSync(prototypeIndex)) {
  console.error('\n  Error: Prototype not found at prototypes/create-new-inventory/index.html');
  console.error('  Run this script from the repo root (the folder that contains package.json).\n');
  process.exit(1);
}

tryListen(0);
