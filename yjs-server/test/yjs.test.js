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
