# PrepHub Code Runner (Stub)

This is a stubbed code-runner microservice. In production this should:

- Accept run jobs via POST /run (language, code, stdin, timeouts)
- Enqueue into a sandboxed worker system (Firecracker / Docker with strict seccomp / rlimits)
- Stream logs / results and persist job history

Current behavior: returns a queued job response and a jobId. Use this to scaffold the worker/pipeline.
