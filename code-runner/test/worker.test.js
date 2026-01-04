const fetch = require('node-fetch');
const app = require('../index');
let server;

beforeAll(async () => {
  server = app.listen(5002);
  await new Promise((r) => setTimeout(r, 50));
});

afterAll(() => {
  server.close();
});

jest.setTimeout(5000);

test('enqueue and complete job via in-memory worker', async () => {
  const res = await fetch('http://localhost:5002/run', { method: 'POST', body: JSON.stringify({ language: 'javascript', code: 'console.log(1);' }), headers: { 'Content-Type': 'application/json' } });
  expect(res.status).toBe(200);
  const body = await res.json();
  expect(body).toHaveProperty('jobId');
  const id = body.jobId;

  // Poll for completion
  let state = null;
  for (let i = 0; i < 20; i++) {
    const s = await fetch(`http://localhost:5002/run/${id}`);
    if (s.status === 200) {
      const data = await s.json();
      if (data.status === 'completed' || data.state === 'completed') {
        state = data;
        break;
      }
    }
    await new Promise(r => setTimeout(r, 100));
  }
  expect(state).not.toBeNull();
});
