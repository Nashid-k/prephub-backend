const WebSocket = require('ws');
const { start, stop } = require('../index');

let server;

beforeAll(async () => {
  server = await start(6002);
});

afterAll(async () => {
  await stop();
});

test('accepts websocket connections on /yjs/:room', (done) => {
  const ws = new WebSocket('ws://localhost:6002/yjs/test-doc');
  ws.on('open', () => {
    ws.close();
    done();
  });
  ws.on('error', (err) => {
    done(err);
  });
});

test('responds to HTTP health or root', async () => {
  const fetch = require('node-fetch');
  // try /health then /
  let ok = false;
  try {
    const r = await fetch('http://127.0.0.1:6002/health');
    if (r.status === 200) {
      const body = await r.text();
      if (body.includes('ok') || body.includes('{')) ok = true;
    }
  } catch (e) {}
  if (!ok) {
    const r = await fetch('http://127.0.0.1:6002/');
    const body = await r.text();
    expect(body).toContain('okay');
  }
});
