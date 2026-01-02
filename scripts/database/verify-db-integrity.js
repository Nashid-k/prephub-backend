
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from '../../src/models/Topic.js';
import Category from '../../src/models/Category.js';
import PathMap from '../../src/models/PathMap.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const verifyIntegrity = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('📦 Connected to MongoDB');

        const topicsToCheck = ['python', 'django', 'postgresql'];
        
        for (const slug of topicsToCheck) {
            console.log(`\n--- Checking Topic: ${slug} ---`);
            const topic = await Topic.findOne({ slug });
            if (!topic) {
                console.log(`❌ Topic NOT FOUND: ${slug}`);
                continue;
            }
            console.log(`✅ Topic Found: ${topic.name} (${topic._id})`);

            const categories = await Category.find({ topicId: topic._id });
            console.log(`📊 Categories count: ${categories.length}`);
            
            if (categories.length > 0) {
                console.log(`🔍 Sample Category Slugs:`);
                categories.slice(0, 5).forEach(c => console.log(`   - ${c.slug} (Name: "${c.name}")`));
            } else {
                console.warn(`⚠️ NO CATEGORIES FOUND for topic ${slug}`);
            }

            // Check PathMaps
            const pathMaps = await PathMap.find({ topicId: topic._id });
            if (pathMaps.length > 0) {
                console.log(`🚫 PathMaps EXIST (${pathMaps.length}). This might be filtering content!`);
                pathMaps.forEach(pm => {
                    console.log(`   - PathMap (Level: ${pm.experienceLevel}): Has ${pm.visibleCategorySlugs.length} slugs`);
                    console.log(`     Sample cached slugs: ${pm.visibleCategorySlugs.slice(0, 3).join(', ')}`);
                });
            } else {
                console.log(`✅ No PathMaps found (Good: implies no stale filtering)`);
            }
        }

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

verifyIntegrity();
