// Singleton database connection manager
// Prevents duplicate connections across seed files
import mongoose from 'mongoose';

let connection = null;
let isConnecting = false;

/**
 * Get or create MongoDB connection (Singleton pattern)
 * @returns {Promise<mongoose.Connection>}
 */
export const getConnection = async () => {
  // Return existing connection
  if (connection && mongoose.connection.readyState === 1) {
    return connection;
  }

  // Wait if connection is in progress
  if (isConnecting) {
    await new Promise(resolve => {
      const interval = setInterval(() => {
        if (mongoose.connection.readyState === 1) {
          clearInterval(interval);
          resolve();
        }
      }, 100);
    });
    return mongoose.connection;
  }

  // Create new connection
  isConnecting = true;
  
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is required');
    }

    connection = await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 50, // Allow parallel seed operations
      minPoolSize: 5,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000
    });

    console.log('✅ MongoDB connected (pooled connection)');
    isConnecting = false;
    return connection;
  } catch (error) {
    isConnecting = false;
    console.error('❌ MongoDB connection failed:', error.message);
    throw error;
  }
};

/**
 * Close database connection gracefully
 */
export const closeConnection = async () => {
  if (connection) {
    await mongoose.connection.close();
    connection = null;
    console.log('👋 MongoDB connection closed');
  }
};

/**
 * Get connection health status
 */
export const getConnectionStatus = () => {
  const state = mongoose.connection.readyState;
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  return states[state] || 'unknown';
};

export default { getConnection, closeConnection, getConnectionStatus };
