# Phase 1 Backlog — Real-time & Code Runner Foundation (2 weeks)

This backlog focuses on delivering the foundation: Socket.IO real-time server, presence/awareness channels, a safe code-runner microservice with queue/worker, basic CI/tests, and an in-repo prototype for collaborative editing (Yjs).

Priority tasks (MVP - 2 weeks)

1. Socket.IO Server (ws-server) — 3d
   - Add Redis adapter (done as optional). Acceptance: runs with REDIS_URL and scales across two instances with messages delivered between them.
   - Add token-based socket authentication using existing JWT/session (Auth middleware + tests). Acceptance: sockets reject unauthorized connections.
   - Add presence channel `/topic/:slug` awareness (join/leave, cursors). Acceptance: presence events show count and IDs; add simple REST endpoint for recent presence.

2. Code-Runner (code-runner) — 3d
   - Replace in-memory worker with BullMQ-backed queue (optional when REDIS_URL present). Acceptance: enqueue, process, and return job status.
   - Add a safe sandbox worker (stubbed now) that will be replaced later by Firecracker/Docker runner. Acceptance: worker returns simulated output and job lifecycle events.
   - Persist job metadata (MongoDB collection or short-term Redis) to enable audit. Acceptance: job history available via GET /run/:id.

3. Integration & Security — 2d
   - Add rate-limits and request size limits on code-runner.
   - Add circuit breaker and request quotas per-user for both ws-server and code-runner.
   - Add logging traces (OpenTelemetry placeholder) and metrics hooks.

4. Collaborative Editor Prototype (Yjs) — 3d
   - Add a small Yjs-powered editor demo page in frontend (feature branch) and a WebSocket awareness binding to ws-server. Acceptance: two browser tabs show collaborative edits.

5. CI & Tests — 1d
   - Ensure `feature-stubs-ci.yml` runs on feature branches and executes the tests (done for code-runner).
   - Add basic smoke tests for ws-server (health and namespace connect), and add to CI.

Deliverables
- `feat/realtime-socket-code-runner` PR contains working stubs + tests + CI. (done)
- Follow-up PRs for auth, Yjs prototype, and Firecracker runner.

Notes
- Use feature flags (config and env, e.g., FEATURE_REALTIME=true) to gate behaviors during staged rollout.
- Keep the code-runner sandbox as a separate infra component (k8s Job / serverless / Firecracker) to limit blast radius.

---

If you'd like, I can now:
- Open the PR for the branch (needs GH auth), or
- Create per-task issues (JIRA-style) with acceptance criteria and point estimates (I can add them as GitHub issues or a Kanban board).