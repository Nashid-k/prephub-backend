import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Section from '../models/Section.js';
import Topic from '../models/Topic.js';

dotenv.config();

/**
 * Migration script to calculate and add estimated minutes to all sections
 * Based on content length (approximate reading time)
 */

const calculateEstimatedMinutes = (content, keyPoints = []) => {
    // Average reading speed: 200 words per minute
    // Average code reading speed: 100 words per minute
    
    if (!content) return 15; // Default minimum

    const words = content.split(/\s+/).length;
    const codeBlocks = (content.match(/```/g) || []).length / 2; // Count code blocks
    
    // Estimate reading time
    const textMinutes = words / 200;
    // Add extra time for code blocks (slower reading)
    const codeMinutes = codeBlocks * 3;
    // Add time for key points
    const keyPointsMinutes = keyPoints.length * 0.5;
    
    const total = Math.ceil(textMinutes + codeMinutes + keyPointsMinutes);
    
    // Clamp between 5 and 180 minutes
    return Math.max(5, Math.min(180, total));
};

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        const sections = await Section.find({});
        console.log(`📊 Found ${sections.length} sections to process`);

        let updated = 0;
        for (const section of sections) {
            const estimatedMinutes = calculateEstimatedMinutes(section.content, section.keyPoints);
            
            await Section.updateOne(
                { _id: section._id },
                { $set: { estimatedMinutes } }
            );
            
            updated++;
            if (updated % 10 === 0) {
                console.log(`⏳ Processed ${updated}/${sections.length} sections...`);
            }
        }

        console.log(`✅ Successfully updated ${updated} sections with time estimates`);
        
        // Show some stats
        const stats = await Section.aggregate([
            {
                $group: {
                    _id: null,
                    avgTime: { $avg: '$estimatedMinutes' },
                    minTime: { $min: '$estimatedMinutes' },
                    maxTime: { $max: '$estimatedMinutes' },
                    totalSections: { $sum: 1 }
                }
            }
        ]);

        if (stats.length > 0) {
            console.log('\n📈 Time Estimate Statistics:');
            console.log(`   Average: ${Math.round(stats[0].avgTime)} minutes`);
            console.log(`   Min: ${stats[0].minTime} minutes`);
            console.log(`   Max: ${stats[0].maxTime} minutes`);
            console.log(`   Total sections: ${stats[0].totalSections}`);
        }

        await mongoose.disconnect();
        console.log('\n✅ Migration completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Migration failed:', error);
        await mongoose.disconnect();
        process.exit(1);
    }
};

run();
