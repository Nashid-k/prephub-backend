# PrepHub WS Server (Socket.IO)

This small service provides a Socket.IO namespace for topic-based presence and messaging.

- Health: GET /health
- Namespace pattern: /topic/:slug

Install & Run

```bash
cd ws-server
npm install
npm start
```

Docker

```bash
docker build -t prephub-ws-server .
docker run -p 4000:4000 prephub-ws-server
```

Notes

- This is an initial stub for real-time features (presence, simple message forwarding). It should be extended with authentication, rate limiting, and scaling options (Redis adapter) for production.
