
import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

// Define Minimal Models
const TopicSchema = new mongoose.Schema({ name: String, slug: String });
const PathMapSchema = new mongoose.Schema({ 
    topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic' },
    experienceLevel: String,
    visibleCategorySlugs: [String]
});

// Avoid OverwriteModelError
const Topic = mongoose.models.Topic || mongoose.model('Topic', TopicSchema);
const PathMap = mongoose.models.PathMap || mongoose.model('PathMap', PathMapSchema);

const EXPERIENCE_LEVELS = ['0-1_year', '1-3_years', '3-5_years'];

async function checkCoverage() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/prephub');
        console.log('Connected to MongoDB');

        const topics = await Topic.find({}).sort({ name: 1 });
        console.log(`Found ${topics.length} topics.\n`);

        console.log('--- PathMap Coverage Report ---');
        console.log('Topic'.padEnd(30) + ' | ' + EXPERIENCE_LEVELS.join(' | '));
        console.log('-'.repeat(80));

        let missingCount = 0;

        for (const topic of topics) {
            let row = topic.name.padEnd(30) + ' | ';
            let hasMissing = false;
            
            for (const level of EXPERIENCE_LEVELS) {
                const map = await PathMap.findOne({ topicId: topic._id, experienceLevel: level });
                const status = map ? `✅ (${map.visibleCategorySlugs.length})` : '❌';
                if (!map) hasMissing = true;
                row += status.padEnd(10) + ' | ';
            }
            console.log(row);
            if (hasMissing) missingCount++;
        }

        console.log('\nTotal Topics with Partial/No Coverage:', missingCount);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

checkCoverage();
