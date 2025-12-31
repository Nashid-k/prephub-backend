import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directories
const seedsDir = path.join(__dirname, 'seeds');
const topicsDir = path.join(seedsDir, 'topics');
const hierarchyDir = path.join(seedsDir, 'hierarchy');
const dsaDir = path.join(seedsDir, 'dsa');
const miscDir = path.join(seedsDir, 'misc');

console.log('🚀 Starting Master Seeding Process...\n');

// 1. Identify Topics and Prioritize
const topics = new Set();
const topicFiles = new Map(); // topicName -> filePath

// Helper to extract topic name
// seed-{name}-topic.js or seed-{name}-hierarchy.js
const getTopicName = (filename) => {
    const match = filename.match(/^seed-(.+)-(topic|hierarchy)\.js$/);
    return match ? match[1] : null;
};

// Scan topics directory (High Priority)
if (fs.existsSync(topicsDir)) {
    fs.readdirSync(topicsDir).forEach(file => {
        const topicName = getTopicName(file);
        if (topicName && file.endsWith('-topic.js')) {
            topics.add(topicName);
            topicFiles.set(topicName, path.join(topicsDir, file));
        }
    });
}

// Scan hierarchy directory (Low Priority - Fallback)
if (fs.existsSync(hierarchyDir)) {
    fs.readdirSync(hierarchyDir).forEach(file => {
        const topicName = getTopicName(file);
        if (topicName && file.endsWith('-hierarchy.js')) {
            if (!topicFiles.has(topicName)) {
                // Only add if not already present from topicsDir
                topics.add(topicName);
                topicFiles.set(topicName, path.join(hierarchyDir, file));
            } else {
                console.log(`ℹ️  Skipping hierarchy for '${topicName}' (Topic file found)`);
            }
        }
    });
}

// Build execution list
const executionPlan = [];

// 1. Main Topics
Array.from(topicFiles.values()).forEach(filepath => executionPlan.push(filepath));

// 2. DSA Supplemental Content
if (fs.existsSync(dsaDir)) {
    fs.readdirSync(dsaDir).forEach(file => {
        if (file.endsWith('.js')) {
            executionPlan.push(path.join(dsaDir, file));
        }
    });
}

// 3. Misc Content
if (fs.existsSync(miscDir)) {
    fs.readdirSync(miscDir).forEach(file => {
        // Skip seed.js if we want to avoid double seeding, or keep it depending on user intent.
        // seed.js seemed to be the old monolithic fallback. We successfully split it up.
        // Let's Skip 'seed.js' to avoid duplicates/conflicts as we likely have specific files now.
        if (file.endsWith('.js') && file !== 'seed.js') {
            executionPlan.push(path.join(miscDir, file));
        }
    });
}

console.log(`\n📋 Execution Plan (${executionPlan.length} files):`);
executionPlan.forEach(f => console.log(` - ${path.basename(f)}`));
console.log('\n----------------------------------------\n');

// Execute
for (const filepath of executionPlan) {
    try {
        const filename = path.basename(filepath);
        console.log(`📦 Seeding: ${filename}...`);
        execSync(`node "${filepath}"`, { stdio: 'inherit' });
        console.log(`✅ Completed: ${filename}\n`);
    } catch (error) {
        console.error(`❌ Error seeding ${path.basename(filepath)}:`, error.message);
    }
}

console.log('🎉 Master Seeding Finished!');
