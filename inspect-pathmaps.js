
import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const TopicSchema = new mongoose.Schema({ name: String, slug: String });
const PathMapSchema = new mongoose.Schema({ 
    topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic' },
    experienceLevel: String,
    visibleCategorySlugs: [String]
});

const Topic = mongoose.models.Topic || mongoose.model('Topic', TopicSchema);
const PathMap = mongoose.models.PathMap || mongoose.model('PathMap', PathMapSchema);

const TARGET_TOPICS = ['javascript', 'python', 'java', 'react', 'nodejs', 'machine-learning', 'data-analyst', 'flutter'];

async function inspectPathMaps() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/prephub');
        console.log('Connected to MongoDB');

        for (const slug of TARGET_TOPICS) {
            const topic = await Topic.findOne({ slug });
            if (!topic) {
                console.log(`Topic NOT FOUND: ${slug}`);
                continue;
            }

            console.log(`\nTopic: ${topic.name} (${slug})`);
            const maps = await PathMap.find({ topicId: topic._id });
            
            maps.forEach(map => {
                console.log(`  - ${map.experienceLevel}: ${map.visibleCategorySlugs.length} categories`);
            });
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

inspectPathMaps();
