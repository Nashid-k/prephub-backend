import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

/**
 * Health Check Endpoint
 * Used by Render for auto-restart on failure
 * Used by UptimeRobot for keep-alive pings
 */
router.get('/', async (req, res) => {
    const startTime = Date.now();
    
    try {
        // Check MongoDB connection
        const dbState = mongoose.connection.readyState;
        const dbStatus = {
            0: 'disconnected',
            1: 'connected',
            2: 'connecting',
            3: 'disconnecting'
        };

        // Optional: Quick DB ping
        let dbPing = null;
        if (dbState === 1) {
            try {
                await mongoose.connection.db.admin().ping();
                dbPing = 'ok';
            } catch {
                dbPing = 'error';
            }
        }

        const health = {
            status: dbState === 1 ? 'healthy' : 'degraded',
            timestamp: new Date().toISOString(),
            uptime: Math.floor(process.uptime()),
            version: process.env.npm_package_version || '1.0.0',
            environment: process.env.NODE_ENV || 'development',
            database: {
                status: dbStatus[dbState] || 'unknown',
                ping: dbPing
            },
            memory: {
                used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
                total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
                rss: Math.round(process.memoryUsage().rss / 1024 / 1024)
            },
            responseTime: `${Date.now() - startTime}ms`
        };

        // Return 503 if database is not connected (triggers Render restart)
        const statusCode = dbState === 1 ? 200 : 503;
        res.status(statusCode).json(health);

    } catch (error) {
        res.status(503).json({
            status: 'error',
            timestamp: new Date().toISOString(),
            error: error.message,
            responseTime: `${Date.now() - startTime}ms`
        });
    }
});

/**
 * Lightweight ping endpoint for keep-alive
 */
router.get('/ping', (req, res) => {
    res.status(200).send('pong');
});

export default router;
