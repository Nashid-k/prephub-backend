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
io.of(/^\/topic\/.+/).on('connection', (socket) => {
  const nsp = socket.nsp; // namespace
  console.log(`Socket connected to ${nsp.name} (id=${socket.id})`);

  // On hello, store user info and broadcast presence
  socket.on('hello', (payload) => {
    socket.data.user = payload?.user || { id: socket.id };
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

const PORT = process.env.SOCKET_PORT || 4000;
server.listen(PORT, () => {
  console.log(`Socket.IO server listening on port ${PORT}`);
});

module.exports = server;
