PR Title: feat(realtime): add Socket.IO ws-server stub and code-runner microservice stub (foundation)

Summary:
This PR adds the foundational stubs and test coverage for real-time functionality and a safe code execution pipeline:

- `backend/ws-server/` — Socket.IO server stub with presence channels, health check, Dockerfile, and Redis adapter support (optional with REDIS_URL).
- `backend/code-runner/` — code-runner microservice stub with a queue/worker model. Includes an in-memory worker fallback and tests that validate job lifecycle.
- CI workflow: `.github/workflows/feature-stubs-ci.yml` to run tests on `feat/*` branches.

Why:
This separates real-time and execution responsibilities from the main API, enabling scale and safety while paving the way for collaborative features such as pair coding and live presence.

What to review:
- Functional tests in `code-runner/test` pass locally (jest).
- `ws-server/index.js` includes Redis adapter configuration if `REDIS_URL` is set.

Testing Steps (local):
1. Run `cd backend/ws-server && npm install && npm start` then open `http://localhost:4000/health`.
2. Run `cd backend/code-runner && npm install && npm test` to validate tests; `npm start` to run the stub server.

Notes & Next Steps:
- Add socket auth middleware and Redis setup for scale.
- Add Yjs collaborative editor demo in frontend and integrate presence.
- Replace the in-memory worker with a sandboxed runner (Firecracker/Docker) behind a job queue.

Related issues: TBD

---

Open PR URL:
https://github.com/Nashid-k/prephub-backend/pull/new/feat/realtime-socket-code-runner
