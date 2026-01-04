// Worker that processes jobs either via BullMQ (Redis) or an in-memory fallback
const EventEmitter = require('events');
const { v4: uuid } = require('uuid');

class InMemoryWorker extends EventEmitter {
  constructor() {
    super();
    this.jobs = new Map();
  }

  enqueue(job) {
    const id = job.jobId || uuid();
    this.jobs.set(id, { ...job, status: 'queued' });
    setTimeout(() => {
      // simulate execution
      const out = { stdout: `Simulated output for ${id}`, exitCode: 0 };
      this.jobs.set(id, { ...this.jobs.get(id), status: 'completed', output: out });
      this.emit('completed', id, this.jobs.get(id));
    }, 250);
    return id;
  }

  status(jobId) {
    return this.jobs.get(jobId) || null;
  }
}

module.exports = { InMemoryWorker };
