// Structured logging with Winston
// Production-grade logging for debugging and monitoring
import winston from 'winston';
import 'winston-mongodb';

const { combine, timestamp, errors, json, printf, colorize } = winston.format;

// Custom format for console output
const consoleFormat = printf(({ level, message, timestamp, ...metadata }) => {
  let msg = `${timestamp} [${level}]: ${message}`;
  
  if (Object.keys(metadata).length > 0) {
    msg += ` ${JSON.stringify(metadata)}`;
  }
  
  return msg;
});

// Create logger instance
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    json()
  ),
  defaultMeta: {
    service: 'prephub-backend',
    environment: process.env.NODE_ENV || 'development'
  },
  transports: [
    // Console output (development)
    new winston.transports.Console({
      format: combine(
        colorize(),
        timestamp({ format: 'HH:mm:ss' }),
        consoleFormat
      )
    }),
    
    // File: All logs
    new winston.transports.File({
      filename: 'logs/combined.log',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    
    // File: Error logs only
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      maxsize: 5242880,
      maxFiles: 5
    })
  ]
});

// Add MongoDB transport in production
if (process.env.NODE_ENV === 'production' && process.env.MONGODB_URI) {
  logger.add(
    new winston.transports.MongoDB({
      db: process.env.MONGODB_URI,
      collection: 'logs',
      level: 'error',
      options: {
        useUnifiedTopology: true
      },
      metaKey: 'metadata',
      expireAfterSeconds: 2592000 // 30 days
    })
  );
}

// Helper methods for common log patterns
export const loggers = {
  /**
   * Log API request
   */
  request: (req, metadata = {}) => {
    logger.info('API Request', {
      method: req.method,
      url: req.url,
      ip: req.ip,
      userAgent: req.get('user-agent'),
      ...metadata
    });
  },

  /**
   * Log API response
   */
  response: (req, res, duration, metadata = {}) => {
    logger.info('API Response', {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      ...metadata
    });
  },

  /**
   * Log database operation
   */
  database: (operation, model, metadata = {}) => {
    logger.debug('Database Operation', {
      operation,
      model,
      ...metadata
    });
  },

  /**
   * Log AI operation
   */
  ai: (provider, operation, metadata = {}) => {
    logger.info('AI Operation', {
      provider,
      operation,
      ...metadata
    });
  },

  /**
   * Log error with context
   */
  error: (error, context = {}) => {
    logger.error('Error', {
      error: error.message,
      stack: error.stack,
      ...context
    });
  },

  /**
   * Log performance metric
   */
  performance: (metric, value, metadata = {}) => {
    logger.info('Performance', {
      metric,
      value,
      ...metadata
    });
  }
};

// HTTP request logging middleware
export const requestLogger = (req, res, next) => {
  const startTime = Date.now();
  
  // Log request
  loggers.request(req);
  
  // Log response when finished
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    loggers.response(req, res, duration);
  });
  
  next();
};

// Error logging middleware
export const errorLogger = (err, req, res, next) => {
  loggers.error(err, {
    url: req.url,
    method: req.method,
    body: req.body,
    params: req.params,
    query: req.query
  });
  
  next(err);
};

export default logger;
