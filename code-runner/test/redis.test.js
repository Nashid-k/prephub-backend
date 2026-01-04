const fetch = require('node-fetch');

// This test only runs when REDIS_URL is configured (CI job)
if (!process.env.REDIS_URL) {
  test.skip('Redis not configured - skipping Redis integration test', () => {});
} else {
  const appPath = require.resolve('../index');
  let app; // will be required after setting env
  let server;

  beforeAll(async () => {
    // ensure DockerRunner runs in simulation mode during CI
    process.env.DISABLE_DOCKER = '1';
    // require app after env is set so it picks up REDIS_URL
    app = require(appPath);
    server = app.listen(5003);
    await new Promise((r) => setTimeout(r, 50));
  });

  afterAll(() => {
    if (server) server.close();
  });

  jest.setTimeout(20000);

  test('enqueue and complete job via Redis-backed BullMQ worker', async () => {
    const res = await fetch('http://localhost:5003/run', { method: 'POST', body: JSON.stringify({ language: 'javascript', code: 'console.log(42);' }), headers: { 'Content-Type': 'application/json' } });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('jobId');
    const id = body.jobId;

    // Poll for completion
    let state = null;
    for (let i = 0; i < 60; i++) {
      const s = await fetch(`http://localhost:5003/run/${id}`);
      if (s.status === 200) {
        const data = await s.json();
        if (data.status === 'completed' || data.state === 'completed' || (data.result && data.result.exitCode === 0)) {
          state = data;
          break;
        }
      }
      await new Promise(r => setTimeout(r, 200));
    }
    expect(state).not.toBeNull();
  });
}
