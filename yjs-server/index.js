const http = require('http');
const WebSocket = require('ws');

// y-websocket exposes setupWSConnection in different builds depending on version.
let setupWSConnection;
try {
  const utils = require('y-websocket/bin/utils.js');
  setupWSConnection = utils.setupWSConnection || (utils.default && utils.default.setupWSConnection);
} catch (e) {
  try {
    const utils = require('y-websocket/bin/utils.cjs');
    setupWSConnection = utils.setupWSConnection || (utils.default && utils.default.setupWSConnection);
  } catch (e2) {
    // last resort - some versions export directly
    const root = require('y-websocket');
    setupWSConnection = root.setupWSConnection || (root.default && root.default.setupWSConnection);
  }
}
if (typeof setupWSConnection !== 'function') {
  // not fatal — we'll fallback to spawning the packaged server binary
  console.warn('setupWSConnection not available; will spawn y-websocket server binary as fallback');
  setupWSConnection = null;
}

let server;
let serverProcess;

async function start(port = process.env.PORT || 6001) {
  // If setupWSConnection is available, use embedded server; otherwise spawn packaged server
  if (typeof setupWSConnection === 'function') {
    server = http.createServer((req, res) => {
      if (req.url === '/health') return res.end(JSON.stringify({ status: 'ok' }));
      res.statusCode = 404;
      res.end('not found');
    });

    const wss = new WebSocket.Server({ noServer: true });

    server.on('upgrade', (request, socket, head) => {
      // route /yjs/<room>
      wss.handleUpgrade(request, socket, head, (ws) => {
        setupWSConnection(ws, request, { gc: true });
      });
    });

    await new Promise((resolve) => server.listen(port, resolve));
    console.log(`yjs websocket server (embedded) listening on ${port}`);
    return server;
  }

  // Fallback to spawning the packaged y-websocket server binary
  const { spawn } = require('child_process');
  const path = require('path');
  const pkgJson = require.resolve('y-websocket/package.json');
  const pkgDir = path.dirname(pkgJson);
  const serverScript = path.join(pkgDir, 'bin', 'server.js');
  serverProcess = spawn(process.execPath, [serverScript], {
    env: { ...process.env, PORT: String(port), HOST: '127.0.0.1' },
    stdio: ['ignore', 'pipe', 'pipe']
  });

  return new Promise((resolve, reject) => {
    const onData = (chunk) => {
      const s = String(chunk);
      if (s.includes('running at')) {
        clearTimeout(startupTimer);
        serverProcess.stdout.off('data', onData);
        console.log(`y-websocket child process started on port ${port}`);
        resolve(serverProcess);
      }
    };
    serverProcess.stdout.on('data', onData);
    serverProcess.on('error', (e) => {
      clearTimeout(startupTimer);
      reject(e);
    });
    const startupTimer = setTimeout(() => {
      serverProcess.stdout.off('data', onData);
      reject(new Error('y-websocket server did not start in time'));
    }, 5000);
  });
}

function stop() {
  return new Promise((resolve) => {
    if (server) return server.close(() => { server = null; resolve(); });
    if (serverProcess) {
      try { serverProcess.kill(); } catch (e) {}
      try { serverProcess.stdout && serverProcess.stdout.destroy(); } catch (e) {}
      try { serverProcess.stderr && serverProcess.stderr.destroy(); } catch (e) {}
      serverProcess = null;
      return resolve();
    }
    resolve();
  });
}

if (require.main === module) {
  start().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { start, stop };
