const io = require('socket.io-client');
const serverModule = require('../index');

let server;

beforeAll((done) => {
  process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret';
  server = serverModule.listen(4002, () => setTimeout(done, 30));
});

afterAll(() => {
  server.close();
});

test('health endpoint returns ok', async () => {
  const res = await fetch('http://localhost:4002/health');
  const j = await res.json();
  expect(j).toHaveProperty('status', 'ok');
});

test('connect with JWT and presence endpoint shows user', async () => {
  const jwt = require('jsonwebtoken');
  const token = jwt.sign({ id: 'u123', email: 'test@example.com' }, process.env.JWT_SECRET);

  const client = io('http://localhost:4002/topic/test', { auth: { token }, reconnection: false });

  await new Promise((resolve, reject) => {
    client.on('connect', resolve);
    client.on('connect_error', reject);
  });

  // allow server time to register
  await new Promise(r => setTimeout(r, 100));

  const res = await fetch('http://localhost:4002/topic/test/presence');
  const j = await res.json();
  expect(j.count).toBeGreaterThan(0);
  const found = j.users.find(u => u.user && u.user.id === 'u123');
  expect(found).toBeTruthy();

  client.disconnect();
});
