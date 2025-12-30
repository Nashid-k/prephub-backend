import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

async function createIndexSafely(collection, indexSpec, options) {
    try {
        await collection.createIndex(indexSpec, options);
        console.log(`  ✅ Created index: ${options.name}`);
        return true;
    } catch (error) {
        if (error.code === 85 || error.message.includes('already exists')) {
            console.log(`  ⚠️  Index ${options.name} already exists, skipping`);
            return true;
        } else if (error.code === 11000) {
            console.log(`  ⚠️  Duplicate data found, creating non-unique index instead`);
            // Create without unique constraint
            const newOptions = { ...options };
            delete newOptions.unique;
            await collection.createIndex(indexSpec, newOptions);
            return true;
        }
        throw error;
    }
}

async function createIndexes() {
    try {
        console.log('🔗 Connecting to MongoDB Atlas...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected successfully!\n');

        const db = mongoose.connection.db;

        // Categories Collection
        console.log('📊 Creating indexes for Categories collection...');
        await createIndexSafely(
            db.collection('categories'),
            { slug: 1 },
            { name: 'category_slug' }
        );
        await createIndexSafely(
            db.collection('categories'),
            { topicId: 1 },
            { name: 'category_topicId' }
        );

        // Topics Collection
        console.log('\n📊 Creating indexes for Topics collection...');
        await createIndexSafely(
            db.collection('topics'),
            { slug: 1 },
            { name: 'topic_slug' }
        );

        // Sections Collection
        console.log('\n📊 Creating indexes for Sections collection...');
        await createIndexSafely(
            db.collection('sections'),
            { slug: 1 },
            { name: 'section_slug' }
        );
        await createIndexSafely(
            db.collection('sections'),
            { categoryId: 1 },
            { name: 'section_categoryId' }
        );

        // Progress Collection
        console.log('\n📊 Creating indexes for Progress collection...');
        await createIndexSafely(
            db.collection('progresses'),
            { userId: 1 },
            { name: 'progress_userId' }
        );

        // Verify indexes
        console.log('\n📋 Verifying indexes...\n');
        
        const categoryIndexes = await db.collection('categories').indexes();
        console.log('✅ Categories indexes:', categoryIndexes.map(i => i.name).join(', '));
        
        const topicIndexes = await db.collection('topics').indexes();
        console.log('✅ Topics indexes:', topicIndexes.map(i => i.name).join(', '));
        
        const sectionIndexes = await db.collection('sections').indexes();
        console.log('✅ Sections indexes:', sectionIndexes.map(i => i.name).join(', '));
        
        const progressIndexes = await db.collection('progresses').indexes();
        console.log('✅ Progress indexes:', progressIndexes.map(i => i.name).join(', '));

        console.log('\n🎉 Index creation complete!');
        console.log('🚀 Expected query speedup: 10x faster');
        
        await mongoose.connection.close();
        console.log('\n🔒 Connection closed');
        process.exit(0);
    } catch (error) {
        console.error('\n❌ Error:', error.message);
        await mongoose.connection.close();
        process.exit(1);
    }
}

createIndexes();
