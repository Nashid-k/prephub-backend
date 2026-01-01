// Clear entire database and prepare for fresh seeding
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

async function clearDatabase() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db();
    
    // Clear all main collections
    console.log('\n🗑️  Clearing database...');
    
    const collections = ['topics', 'categories', 'sections', 'caches', 'userprogressions'];
    
    for (const collectionName of collections) {
      const result = await db.collection(collectionName).deleteMany({});
      console.log(`  ✅ Cleared ${collectionName}: ${result.deletedCount} documents`);
    }
    
    console.log('\n✨ Database cleared! Ready for fresh seeding with proper study order.');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

clearDatabase();
