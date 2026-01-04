const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuid } = require('uuid');

const app = express();
app.use(bodyParser.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Very small stub: Accepts a run request and returns a simulated job response.
app.post('/run', (req, res) => {
  const { language, code, stdin, timeout } = req.body || {};
  if (!language || !code) return res.status(400).json({ error: 'language and code required' });

  // NOTE: This is a safe stub. Do NOT execute code in-process here. This should enqueue a job
  // for a sandboxed worker (e.g., Firecracker microVM) in production.

  const jobId = uuid();
  const result = {
    jobId,
    status: 'queued',
    message: 'stubbed runner — implement sandbox worker to execute code safely',
    output: null
  };

  return res.json(result);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`code-runner stub listening on ${PORT}`));

module.exports = app;
