import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      // Connection Pooling - Optimized for Atlas M0 free tier
      // M0 has 500 total connections shared - be conservative
      maxPoolSize: 5,          // Max 5 concurrent connections (free tier friendly)
      minPoolSize: 1,          // Keep 1 connection warm for instant response
      maxIdleTimeMS: 30000,    // Close idle connections after 30s (save resources)
      
      // Timeouts - Handle Render/Atlas free tier latency
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      heartbeatFrequencyMS: 10000,  // Monitor connection health
      
      // Performance - Compress network traffic
      compressors: ['zlib'],
      zlibCompressionLevel: 6,
      
      // Reliability - Auto-retry for cold starts
      retryWrites: true,
      retryReads: true,
      w: 'majority',          // Ensure write durability
      
      // Monitoring
      autoIndex: process.env.NODE_ENV !== 'production'  // Only in dev
    });
    
    console.log('✅ MongoDB connected with connection pooling');
    console.log(`📊 Pool: min=1, max=5, compression=zlib (Atlas M0 optimized)`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

export default connectDB;
