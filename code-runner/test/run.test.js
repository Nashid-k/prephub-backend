const request = require('supertest');
const app = require('../index');

describe('POST /run', () => {
  it('returns 400 when missing fields', async () => {
    const res = await request(app).post('/run').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('returns job response when provided', async () => {
    const res = await request(app).post('/run').send({ language: 'javascript', code: 'console.log(1);' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('jobId');
    expect(res.body).toHaveProperty('status', 'queued');
  });
});
