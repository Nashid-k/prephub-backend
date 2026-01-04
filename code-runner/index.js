const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuid } = require('uuid');

const app = express();
app.use(bodyParser.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Create a worker (BullMQ if REDIS_URL set, otherwise in-memory fallback)
let worker;
try {
  if (process.env.REDIS_URL) {
    // Use BullMQ (requires Redis) in production
    const { Queue, Worker } = require('bullmq');
    const IORedis = require('ioredis');
    const connection = new IORedis(process.env.REDIS_URL);
    const queue = new Queue('code-runner', { connection });

    // simple worker that simulates execution (should be replaced with sandboxed runner)
    const realWorker = new Worker('code-runner', async (job) => {
      // simulate execution delay
      await new Promise(r => setTimeout(r, 500));
      return { stdout: `Simulated output for ${job.id}`, exitCode: 0 };
    }, { connection });

    worker = { type: 'bullmq', queue, realWorker };
  } else {
    const { InMemoryWorker } = require('./worker');
    worker = new InMemoryWorker();
  }
} catch (err) {
  console.warn('Failed to initialize BullMQ or ioredis, falling back to in-memory worker', err.message);
  const { InMemoryWorker } = require('./worker');
  worker = new InMemoryWorker();
}

// Accept a run request and enqueue a job
app.post('/run', async (req, res) => {
  const { language, code, stdin, timeout } = req.body || {};
  if (!language || !code) return res.status(400).json({ error: 'language and code required' });

  const jobId = uuid();

  if (worker.type === 'bullmq') {
    await worker.queue.add(jobId, { language, code, stdin, timeout });
    return res.json({ jobId, status: 'queued' });
  }

  // in-memory fallback
  const id = worker.enqueue({ jobId, language, code, stdin, timeout });
  return res.json({ jobId: id, status: 'queued' });
});

// Query job status (in-memory or bullmq)
app.get('/run/:id', async (req, res) => {
  const id = req.params.id;
  if (worker.type === 'bullmq') {
    const job = await worker.queue.getJob(id);
    if (!job) return res.status(404).json({ error: 'not found' });
    const state = await job.getState();
    const result = await job.returnvalue;
    return res.json({ jobId: id, state, result });
  }
  const s = worker.status(id);
  if (!s) return res.status(404).json({ error: 'not found' });
  return res.json(s);
});

const PORT = process.env.PORT || 5000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`code-runner stub listening on ${PORT}`));
}

module.exports = app;
