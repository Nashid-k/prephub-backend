#!/usr/bin/env node
/**
 * Master Re-Seeding Script
 * 
 * Re-seeds all topics to apply the new universal category grouping.
 * Processes topics in optimized order to minimize database load.
 */

import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Topics to re-seed (ordered by dependency/importance)
const topics = [
    // Core languages first
    'javascript',
    'typescript',
    'python',
    'java',
    'c',
    'csharp',
    'dart',
    'golang',
    
    // Frameworks (depend on languages)
    'react',
    'angular',
    'nextjs',
    'flutter',
    'django',
    
    // Backend
    'nodejs',
    'express',
    
    // Databases
    'mongodb',
    'postgresql',
    
    // DSA topics
    'dsa',
    'dsa-datastructures',
    'dsa-blind75',
    'dsa-algorithms'
];

const runSeed = (scriptPath, topicName) => {
    console.log(`\n🌱 Seeding: ${topicName}`);
    console.log(`   Script: ${path.basename(scriptPath)}`);
    
    try {
        execSync(`node ${scriptPath}`, {
            cwd: path.join(__dirname, '../../'),
            stdio: 'inherit',
            timeout: 60000 // 60 second timeout per seed
        });
        console.log(`   ✅ Success`);
        return true;
    } catch (error) {
        console.error(`   ❌ Failed: ${error.message}`);
        return false;
    }
};

const main = async () => {
    console.log('🚀 Master Re-Seeding Script');
    console.log('==========================\n');
    console.log(`📊 Topics to process: ${topics.length}\n`);

    let successCount = 0;
    let failedTopics = [];

    for (const topic of topics) {
        // Determine script path based on topic
        let scriptPath;
        if (topic.startsWith('dsa-')) {
            scriptPath = path.join(__dirname, '../dsa', `seed-${topic}.js`);
        } else {
            scriptPath = path.join(__dirname, '../topics', `seed-${topic}-topic.js`);
        }

        const success = runSeed(scriptPath, topic);
        if (success) {
            successCount++;
        } else {
            failedTopics.push(topic);
        }

        // Brief pause between seeds to avoid DB overload
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('\n\n=============================');
    console.log('✨ Re-Seeding Complete!');
    console.log('=============================');
    console.log(`   ✅ Successful: ${successCount}/${topics.length}`);
    
    if (failedTopics.length > 0) {
        console.log(`   ❌ Failed: ${failedTopics.join(', ')}`);
        console.log('\n💡 Tip: Re-run failed topics individually for better error messages');
    } else {
        console.log('\n🎉 All topics seeded successfully!');
        console.log('   Categories now have intelligent grouping\n');
    }
};

main();
