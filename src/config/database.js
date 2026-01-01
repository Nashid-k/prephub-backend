import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      // Connection Pooling - Optimized for free tier
      maxPoolSize: 10,        // Max 10 concurrent connections
      minPoolSize: 2,         // Keep 2 connections warm
      maxIdleTimeMS: 60000,   // Close idle connections after 1min
      
      // Timeouts - Handle Render/Atlas free tier latency
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      
      // Performance - Compress network traffic
      compressors: ['zlib'],
      zlibCompressionLevel: 6,
      
      // Reliability - Auto-retry for cold starts
      retryWrites: true,
      retryReads: true,
      
      // Monitoring
      autoIndex: false  // Don't auto-create indexes (performance)
    });
    
    console.log('✅ MongoDB connected with connection pooling');
    console.log(`📊 Pool: min=${2}, max=${10}, compression=zlib`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

export default connectDB;
