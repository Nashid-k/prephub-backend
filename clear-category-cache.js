// Clear cache and re-seed with study-order-aware categorization
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

async function clearCategoryCache() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db();
    const cache = db.collection('caches');
    
    // Delete all category_group cache entries
    const result = await cache.deleteMany({ key: { $regex: '^category_group_' } });
    console.log(`✅ Cleared ${result.deletedCount} category cache entries`);
    
    console.log('✨ Cache cleared! AI will now recategorize with study order priority.');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

clearCategoryCache();
