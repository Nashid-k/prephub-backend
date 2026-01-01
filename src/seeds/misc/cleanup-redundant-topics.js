
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from '../../models/Topic.js';
import Category from '../../models/Category.js';
import Section from '../../models/Section.js';

dotenv.config();

const cleanup = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Topics to remove (legacy/redundant slugs)
        const slugsToRemove = ['html-css', 'html', 'css']; // Also check for independent ones just in case

        for (const slug of slugsToRemove) {
            const topic = await Topic.findOne({ slug });
            if (topic) {
                console.log(`Found topic to remove: ${topic.name} (${slug})`);
                
                const categories = await Category.find({ topicId: topic._id });
                const categoryIds = categories.map(c => c._id);
                
                const deletedSections = await Section.deleteMany({ topicId: topic._id });
                console.log(`- Deleted ${deletedSections.deletedCount} sections`);

                const deletedCategories = await Category.deleteMany({ topicId: topic._id });
                console.log(`- Deleted ${deletedCategories.deletedCount} categories`);

                await Topic.deleteOne({ _id: topic._id });
                console.log(`- Deleted Topic: ${slug}`);
            } else {
                console.log(`Topic not found: ${slug} (Already clean)`);
            }
        }

        console.log('Cleanup complete');
        process.exit(0);
    } catch (error) {
        console.error('Cleanup failed:', error);
        process.exit(1);
    }
};

cleanup();
