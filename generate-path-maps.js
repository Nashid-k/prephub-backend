
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from './src/models/Topic.js';
import Category from './src/models/Category.js';
import PathMap from './src/models/PathMap.js';
import geminiService from './src/services/gemini.service.js';

dotenv.config();

const EXPERIENCE_LEVELS = ['0-1_year', '1-3_years', '3-5_years'];

async function generatePathMaps() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        const topics = await Topic.find({});
        console.log(`Found ${topics.length} topics to process.`);

        for (const topic of topics) {
            console.log(`\n📘 Processing Topic: ${topic.name}`);
            
            // 1. Get All Categories
            const categories = await Category.find({ topicId: topic._id });
            if (categories.length === 0) {
                console.log(`   ⚠️ No categories found, skipping.`);
                continue;
            }
            console.log(`   Found ${categories.length} total categories.`);

            // 2. Process each level
            for (const level of EXPERIENCE_LEVELS) {
                console.log(`   ⚙️ Curating for ${level}...`);

                // Check if map already exists (optional: force update flag?)
                // For now, we always regenerate to ensure freshness during dev
                
                // 3. Call AI
                // We pass name, slug, group to help AI decide
                const catData = categories.map(c => ({ 
                    name: c.name, 
                    slug: c.slug, 
                    group: c.group 
                }));

                try {
                    const curation = await geminiService.curatePathMap(catData, topic.name, level);
                    
                    if (!curation || !curation.visibleSlugs) {
                        console.warn(`      ❌ AI returned invalid format for ${level}`);
                        continue;
                    }

                    const visibleCount = curation.visibleSlugs.length;
                    console.log(`      ✅ AI Selected ${visibleCount}/${categories.length} categories.`);
                    console.log(`      🧠 Reasoning: ${curation.reasoning?.substring(0, 100)}...`);

                    // 4. Save to DB
                    await PathMap.findOneAndUpdate(
                        { topicId: topic._id, experienceLevel: level },
                        {
                            topicId: topic._id,
                            experienceLevel: level,
                            visibleCategorySlugs: curation.visibleSlugs,
                            learningStrategy: curation.reasoning,
                            version: Date.now() // Simple versioning
                        },
                        { upsert: true, new: true }
                    );

                } catch (err) {
                    console.error(`      ❌ Error processing ${level}:`, err.message);
                    // Continue to next level
                }
                
                // Sleep slightly to respect rate limits
                await new Promise(r => setTimeout(r, 1000));
            }
        }

        console.log('\n✨ All PathMaps generated successfully.');
        process.exit(0);

    } catch (e) {
        console.error('Fatal Error:', e);
        process.exit(1);
    }
}

generatePathMaps();
