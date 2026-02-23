#!/usr/bin/env node
/**
 * Start local server and open the Create New Inventory prototype in the default browser.
 * Usage: node scripts/serve-and-open.js
 */
const { spawn } = require('child_process');
const http = require('http');
const PORT = 5555;
const URL = `http://localhost:${PORT}/prototypes/create-new-inventory/index.html`;

const server = spawn('python3', ['-m', 'http.server', String(PORT)], {
  cwd: __dirname + '/..',
  stdio: 'inherit',
});

function openBrowser() {
  const start = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
  require('child_process').exec(`${start} "${URL}"`);
  console.log('\nPrototype URL: ' + URL);
  console.log('Server running. Press Ctrl+C to stop.\n');
}

function waitForServer(retries = 20) {
  const req = http.get(`http://127.0.0.1:${PORT}/`, { timeout: 500 }, (res) => {
    openBrowser();
  });
  req.on('error', () => {
    if (retries > 0) setTimeout(() => waitForServer(retries - 1), 300);
    else openBrowser();
  });
}

setTimeout(() => waitForServer(), 800);
