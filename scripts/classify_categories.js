import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Topic from '../src/models/Topic.js';
import Category from '../src/models/Category.js';
import { geminiModels, groqClients } from '../src/config/ai-clients.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

const classifyCategories = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const topics = await Topic.find({});

        for (const topic of topics) {
            // Fetch ALL categories for the topic to allow complete re-organization
            const categories = await Category.find({ topicId: topic._id });

            if (categories.length === 0) {
                console.log(`Skipping topic ${topic.name}: No categories found`);
                continue;
            }

            console.log(`\nProcessing Topic: ${topic.name} (${categories.length} categories)`);
            const categoryNames = categories.map(c => c.name);

            const prompt = `
            You are an expert technical curriculum designer. Your task is to organize the following list of learning categories for the topic "${topic.name}" into 4-7 logical, high-level modules (Groups).
            
            Key Objective: Create a structured "Learning Path" with specific technical domains.

            Categories:
            ${JSON.stringify(categoryNames)}

            Rules:
            1. **STRICTLY FORBIDDEN WORDS**: Do NOT use "Fundamentals", "Basics", "Core Concepts", "Advanced", "General", "Introduction" as standalone group names.
            2. **USE TECHNICAL DOMAINS**: Use specific terms like "Memory Management", "network Stack", "Component Lifecycle", "Async Patterns", "Type Decisions".
            3. **STUDY ORDER**: Prefix every group name with a number to enforce study order (e.g., "01. Syntax & Variables", "02. Control Flow").
            4. Assign EVERY category to exactly one Group.
            5. Return ONLY a valid JSON object where keys are the Category Names and values are the new Group Names.
            
            Example Output Format:
            {
                "Variables": "01. Syntax & Data Types",
                "Loops": "02. Control Structures",
                "Classes": "03. Object Oriented Patterns",
                "Threads": "04. Concurrency Models"
            }
            `;

            let classification = null;
            
            // Try Groq First
            for (const client of groqClients) {
                try {
                    const completion = await client.chat.completions.create({
                        messages: [{ role: 'user', content: prompt }],
                        model: 'llama-3.1-8b-instant',
                        temperature: 0.1,
                    });
                    const text = completion.choices[0]?.message?.content;
                    const jsonMatch = text.match(/\{[\s\S]*\}/);
                    if (jsonMatch) {
                        classification = JSON.parse(jsonMatch[0]);
                        console.log('✅ Classified using Groq');
                        break;
                    }
                } catch (e) {
                    console.error('Groq failed, trying next...');
                }
            }

            // Try Gemini Fallback
            if (!classification) {
                for (const model of geminiModels) {
                    try {
                        const result = await model.instance.generateContent(prompt);
                        const text = result.response.text();
                        const jsonMatch = text.match(/\{[\s\S]*\}/);
                        if (jsonMatch) {
                            classification = JSON.parse(jsonMatch[0]);
                            console.log('✅ Classified using Gemini');
                            break;
                        }
                    } catch (e) {
                        console.error('Gemini failed, trying next...');
                    }
                }
            }

            if (classification) {
                console.log('Applying classifications...');
                let updateCount = 0;
                for (const category of categories) {
                    if (classification[category.name]) {
                        // Only update if changed to avoid unnecessary writes
                        if (category.group !== classification[category.name]) {
                             category.group = classification[category.name];
                             await category.save();
                             updateCount++;
                        }
                    }
                }
                console.log(`Updated ${updateCount} categories.`);
            } else {
                console.error('❌ Failed to classify categories for', topic.name);
            }
        }

        console.log('\n✨ Classification Complete!');
        process.exit(0);

    } catch (error) {
        console.error('Script Error:', error);
        process.exit(1);
    }
};

classifyCategories();
