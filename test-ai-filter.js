
import geminiService from './src/services/gemini.service.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mockTopics = [
    { name: 'Node.js', slug: 'nodejs' },
    { name: 'JavaScript', slug: 'javascript' }
];

async function testAI() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');
    } catch (e) {
        console.error('DB Connection failed', e);
        return;
    }

    console.log('--- Testing AI Filtering ---');
    
    try {
        console.log('Testing "Beginner" Level...');
        const beginnerResult = await geminiService.structureLearningPath(
            mockTopics, 
            "MERN Full Stack", 
            "Beginner (0-1 Year)"
        );
        console.log('Beginner Result:', JSON.stringify(beginnerResult, null, 2));

        console.log('\nTesting "Advanced" Level...');
        const advancedResult = await geminiService.structureLearningPath(
            mockTopics, 
            "MERN Full Stack", 
            "Advanced (3-5 Years)"
        );
        console.log('Advanced Result:', JSON.stringify(advancedResult, null, 2));

    } catch (error) {
        console.error('Error:', error);
    }
}

testAI();
