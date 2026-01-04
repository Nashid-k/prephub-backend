const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// If REDIS_URL is provided, use the redis adapter so multiple ws-server
// instances can coordinate presence and messages.
if (process.env.REDIS_URL) {
  try {
    const { createAdapter } = require('@socket.io/redis-adapter');
    const { default: IORedis } = require('ioredis');
    const pubClient = new IORedis(process.env.REDIS_URL);
    const subClient = pubClient.duplicate();
    io.adapter(createAdapter(pubClient, subClient));
    console.log('Socket.IO Redis adapter configured');
  } catch (err) {
    console.warn('Failed to initialize Redis adapter for Socket.IO, falling back to single-process mode', err.message);
  }
}

app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Namespace pattern: /topic/:slug
// Add authentication middleware (JWT) for namespaces
io.of(/^\/topic\/.+/).use((socket, next) => {
  const token = socket.handshake.auth?.token;
  if (token) {
    try {
      const jwt = require('jsonwebtoken');
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'test-secret');
      socket.data.user = decoded;
    } catch (err) {
      // invalid token => proceed as guest
      socket.data.user = null;
    }
  }
  next();
});

io.of(/^\/topic\/.+/).on('connection', (socket) => {
  const nsp = socket.nsp; // namespace
  console.log(`Socket connected to ${nsp.name} (id=${socket.id})`);

  // On connection, if we have user data, emit presence to others
  if (socket.data?.user) {
    socket.emit('presence:here', { you: socket.data.user });
    socket.broadcast.emit('presence:join', socket.data.user);
  }

  // On hello, accept client-provided presence info
  socket.on('hello', (payload) => {
    socket.data.user = socket.data.user || payload?.user || { id: socket.id };
    socket.emit('presence:here', { you: socket.data.user });
    socket.broadcast.emit('presence:join', socket.data.user);
  });

  socket.on('presence:leave', (user) => {
    socket.broadcast.emit('presence:leave', user || socket.data.user);
  });

  socket.on('msg', (m) => {
    socket.broadcast.emit('msg', m);
  });

  socket.on('disconnect', (reason) => {
    socket.broadcast.emit('presence:leave', socket.data.user || { id: socket.id });
    console.log(`Socket disconnected ${socket.id} (${reason})`);
  });
});

// REST endpoint for presence in a topic namespace
app.get('/topic/:slug/presence', async (req, res) => {
  try {
    const slug = req.params.slug;
    const nspName = `/topic/${slug}`;
    const nsp = io.of(nspName);
    // fetchSockets() works across cluster with Redis adapter
    const sockets = await nsp.fetchSockets();
    const users = sockets.map(s => ({ socketId: s.id, user: s.data?.user || null }));
    return res.json({ count: sockets.length, users });
  } catch (err) {
    return res.status(500).json({ error: 'failed to fetch presence', detail: err.message });
  }
});

const PORT = process.env.SOCKET_PORT || 4000;
// In tests we want to control the server listen port so avoid auto-listen when
// NODE_ENV=test. Tests can call server.listen(PORT) explicitly.
if (process.env.NODE_ENV !== 'test') {
  server.listen(PORT, () => {
    console.log(`Socket.IO server listening on port ${PORT}`);
  });
}

module.exports = server;
