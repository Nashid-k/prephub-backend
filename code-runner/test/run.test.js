const app = require('../index');
let server;

beforeAll(async () => {
  server = app.listen(5001);
  // allow server to start
  await new Promise((r) => setTimeout(r, 50));
});

afterAll(() => {
  server.close();
});

describe('POST /run', () => {
  it('returns 400 when missing fields', async () => {
    const res = await fetch('http://localhost:5001/run', { method: 'POST', body: JSON.stringify({}), headers: { 'Content-Type': 'application/json' } });
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body).toHaveProperty('error');
  });

  it('returns job response when provided', async () => {
    const res = await fetch('http://localhost:5001/run', { method: 'POST', body: JSON.stringify({ language: 'javascript', code: 'console.log(1);' }), headers: { 'Content-Type': 'application/json' } });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('jobId');
    expect(body).toHaveProperty('status', 'queued');
  });
});
