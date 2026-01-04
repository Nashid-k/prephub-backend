import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';

let io;
const connectedUsers = new Map(); // userId -> { socketId, userData }
const activeVisitors = new Set(); // track total active connections including guests

export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: process.env.FRONTEND_URL || '*', // Allow all for dev, restrict in prod
            methods: ['GET', 'POST']
        }
    });

    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                socket.user = decoded;
            } catch (err) {
                // Token invalid, still allow connection as guest
                console.log('Socket auth failed, proceeding as guest');
            }
        }
        next();
    });

    io.on('connection', (socket) => {
        console.log(`🔌 New Connection: ${socket.id}`);
        activeVisitors.add(socket.id);

        // Handle authenticated users
        if (socket.user) {
            connectedUsers.set(socket.user.id, {
                socketId: socket.id,
                user: socket.user
            });
            console.log(`👤 User Verified: ${socket.user.email}`);

            // Join user-specific room for private notifications
            socket.join(`user:${socket.user.id}`);
        }

        // Broadcast stats only to connected clients to save bandwidth (throttle this in prod)
        broadcastStats();

        socket.on('disconnect', () => {
            console.log(`🔌 Disconnected: ${socket.id}`);
            activeVisitors.delete(socket.id);
            if (socket.user) {
                connectedUsers.delete(socket.user.id);
            }
            broadcastStats();
        });

        // Ping (Latency check)
        socket.on('ping', (cb) => {
            if (typeof cb === 'function') cb();
        });
    });

    return io;
};

const broadcastStats = () => {
    if (!io) return;

    io.emit('stats:update', {
        activeUsers: connectedUsers.size,
        totalVisitors: activeVisitors.size,
        timestamp: Date.now()
    });
};

export const getIO = () => {
    if (!io) {
        throw new Error('Socket.io not initialized!');
    }
    return io;
};

// Utility to send notification to specific user
export const notifyUser = (userId, event, data) => {
    if (!io) return;
    io.to(`user:${userId}`).emit(event, data);
};

// Utility to broadcast to everyone
export const broadcast = (event, data) => {
    if (!io) return;
    io.emit(event, data);
};
