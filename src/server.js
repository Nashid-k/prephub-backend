import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';

// Import routes
import aiRoutes from './routes/ai.routes.js';
import compilerRoutes from './routes/compiler.routes.js';
import curriculumRoutes from './routes/curriculum.routes.js';
import categoryRoutes from './routes/category.routes.js';
import progressRoutes from './routes/progress.routes.js';
import testCaseRoutes from './routes/test-case.routes.js';
import searchRoutes from './routes/search.routes.js';
import authRoutes from './routes/auth.routes.js';
import bookmarkRoutes from './routes/bookmark.routes.js';
import recommendationsRoutes from './routes/recommendations.routes.js';
import activityRoutes from './routes/activity.routes.js';
import { scheduleWeeklyEmails } from './jobs/emailScheduler.js';

import { helmetConfig, corsOptions, apiLimiter } from './middleware/security.js';
import { compressionMiddleware } from './middleware/performance.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy for rate limiting on cloud platforms (Render, Heroku, etc.)
app.set('trust proxy', 1);

// Performance Middleware (should be early in the chain)
app.use(compressionMiddleware);

// Security Middleware
app.use(helmetConfig);
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Apply rate limiting to all API routes
app.use('/api/', apiLimiter);


// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/ai', aiRoutes);
app.use('/api/compiler', compilerRoutes);
app.use('/api/curriculum', curriculumRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/test-cases', testCaseRoutes);
app.use('/api', searchRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/api/recommendations', recommendationsRoutes);
app.use('/api/activity', activityRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'PrepHub API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.path
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    return res.status(400).json({ 
      error: 'Validation Error',
      details: Object.values(err.errors).map(e => e.message)
    });
  }
  
  // Mongoose cast error (invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({ 
      error: 'Invalid ID format' 
    });
  }
  
  // Rate limit error
  if (err.status === 429) {
    return res.status(429).json({ 
      error: 'Too many requests, please try again later' 
    });
  }
  
  // Default error
  res.status(err.status || 500).json({ 
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Connect to database and start server
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
      
      // Email scheduler disabled - uncomment when domain is verified on Resend
      // if (process.env.RESEND_API_KEY) {
      //   scheduleWeeklyEmails();
      //   console.log('📧 Email scheduler enabled');
      // }
      console.log(`🏥 Health Check: http://localhost:${PORT}/api/health\n`);

      // Self-ping to keep server awake on Render Free Tier
      const SECOND = 1000;
      const MINUTE = 60 * SECOND;
      const INTERVAL = 14 * MINUTE;

      setInterval(() => {
        const url = process.env.BACKEND_URL || `http://localhost:${PORT}`;
        import('https').then(({ get }) => {
          if (url.startsWith('https')) {
            get(`${url}/api/health`, (res) => {
              console.log(`Self-ping successful: ${res.statusCode}`);
            }).on('error', (err) => {
              console.error(`Self-ping failed: ${err.message}`);
            });
          }
        }).catch(() => {
          // Fallback or ignore for local
        });
      }, INTERVAL);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
