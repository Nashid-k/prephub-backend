const { DockerRunner } = require('../docker-runner');

test('docker runner simulation mode returns simulated output', async () => {
  const dr = new DockerRunner({ disableDocker: true });
  const res = await dr.run({ language: 'javascript', code: 'console.log(1);' });
  expect(res).toHaveProperty('stdout');
  expect(res.exitCode).toBe(0);
});

test('docker runner returns unsupported language code for non-js in POC', async () => {
  const dr = new DockerRunner({ disableDocker: true });
  const res = await dr.run({ language: 'python', code: 'print(1)' });
  expect(res.exitCode).toBe(124);
});
