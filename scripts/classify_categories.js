import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Topic from '../src/models/Topic.js';
import Category from '../src/models/Category.js';
import { geminiModels, groqClients } from '../src/config/ai-clients.js';
import { createProtectedAICall } from '../src/utils/circuit-breaker.js';

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
            
            // Sort categories by order to maintain study sequence
            const sortedCategories = categories.sort((a, b) => a.order - b.order);
            
            // Create ordered list with sequence numbers for AI
            const orderedList = sortedCategories
                .map((cat, idx) => `${idx + 1}. ${cat.name}`)
                .join('\n');

    
        const prompt = `
You are an expert curriculum architect. Your PRIMARY GOAL is to group categories by their POSITION IN STUDY SEQUENCE, NOT by semantic similarity.

**TASK**: Organize ${categories.length} learning categories for "${topic.name}" into 4-7 logical study groups.

**CATEGORIES (IN STRICT STUDY ORDER)**:
${orderedList}

🎯 **ABSOLUTE RULES (MUST FOLLOW)**

**RULE #1: SEQUENTIAL PROXIMITY IS LAW**
- Categories CLOSE TOGETHER in sequence (within ~5-8 positions) MUST be in the SAME group
- Example: If categories 1,2,3,4,5,6 exist, they should ALL be in "01. [Group Name]"
- Example: Categories 7,8,9,10,11 should ALL be in "02. [Group Name]"
- **NEVER** separate category #4 from #1-3 just because it has a different topic name
- **NEVER** create a new group until you've grouped ~5-8 consecutive categories

**RULE #2: STUDY ORDER > SEMANTIC SIMILARITY**
- If "Collections" is category #4, it goes with categories 1-3 (all early basics)
- If "Error Handling" is category #5, it goes with categories 1-4 (all foundations)
- DO NOT group by topic similarity (e.g., all "data structure" topics together)
- DO group by learning stage (e.g., all "things student learns first" together)

**RULE #3: GROUP SIZE DISTRIBUTION**
- Target: ${categories.length} categories → 4-7 groups
- Each group should have ~${Math.ceil(categories.length / 5)}-${Math.ceil(categories.length / 4)} categories
- Distribute evenly: Don't create 3-category group followed by 15-category group

**RULE #4: GROUP BOUNDARIES**
- Create new group ONLY when there's a clear learning stage transition:
  ✓ From "setup/syntax" to "core programming concepts"
  ✓ From "basics" to "intermediate patterns"
  ✓ From "core features" to "advanced topics"
  ✗ From "variables" to "arrays" (both are basics!)
  ✗ From "setup" to "collections" (both are early topics!)

**RULE #5: GROUP NAMING**
- Name reflects the LEARNING STAGE, not the specific topics
- ✓ "01. Flutter Foundations" (covers setup, basics, collections, error handling)
- ✓ "02. Core Development" (covers intermediate concepts)
- ✗ "01. Setup & Configuration" then "02. Data Structures" for positions 1-4
- Use numbered prefixes: "01.", "02.", "03."

**EXAMPLES OF CORRECT GROUPING**:

Example 1 (15 categories):
{
  "Category 1 (Variables)": "01. Language Fundamentals",
  "Category 2 (Data Types)": "01. Language Fundamentals",
  "Category 3 (Operators)": "01. Language Fundamentals",
  "Category 4 (Collections)": "01. Language Fundamentals",     ← Same group!
  "Category 5 (Functions)": "01. Language Fundamentals",       ← Same group!
  "Category 6 (OOP Basics)": "02. Object Oriented Programming",
  "Category 7 (Classes)": "02. Object Oriented Programming",
  "Category 8 (Inheritance)": "02. Object Oriented Programming",
  "Category 9 (Polymorphism)": "02. Object Oriented Programming",
  "Category 10 (Async Intro)": "03. Asynchronous Programming",
  "Category 11 (Promises)": "03. Asynchronous Programming",
  ...
}

Example 2 (Bad grouping - DO NOT DO THIS):
{
  "Category 1 (Setup)": "01. Project Setup",
  "Category 2 (Config)": "01. Project Setup",
  "Category 3 (Basics)": "01. Project Setup",
  "Category 4 (Collections)": "02. Data Structures",    ← WRONG! Too early for new group!
  "Category 5 (Error Handling)": "03. Debugging",       ← WRONG! Creates too many groups!
  ...
}

**YOUR TASK**:
1. Calculate group size: ${categories.length} categories ÷ 5 = ~${Math.ceil(categories.length / 5)} per group
2. Group categories 1 through ~${Math   .ceil(categories.length / 5)} as "01. [Stage Name]"
3. Group next ~${Math.ceil(categories.length / 5)} as "02. [Stage Name]"
4. Continue until all categories grouped
5. Adjust boundaries ONLY where there's a clear learning stage shift

**OUTPUT FORMAT (JSON ONLY)**:
{
  "Exact Category Name 1": "01. Group Name",
  "Exact Category Name 2": "01. Group Name",
  ...
}

**CRITICAL**: Return ONLY valid JSON. No markdown, no explanations. Group by SEQUENCE POSITION first, topic similarity second.
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
