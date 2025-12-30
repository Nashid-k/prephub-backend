import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const seedFiles = [
  'seed.js',
  'seed-mongodb-ai.js',
  'seed-mongodb-hierarchy.js',
  'seed-express-hierarchy.js',
  'seed-nodejs-hierarchy.js',
  'seed-react-hierarchy.js',
  'seed-javascript-hierarchy.js',
  'seed-dsa-topic.js',
  'seed-dsa-datastructures.js',
  'seed-dsa-algorithms.js',
  'seed-dsa-blind75.js',
  'seed-postgresql-topic.js',
  'seed-typescript-topic.js'
];

console.log('🚀 Starting Master Seeding Process...\n');

for (const file of seedFiles) {
  try {
    console.log(`📦 Seeding: ${file}...`);
    execSync(`node "${path.join(__dirname, file)}"`, { stdio: 'inherit' });
    console.log(`✅ Completed: ${file}\n`);
  } catch (error) {
    console.error(`❌ Error seeding ${file}:`, error.message);
    // Continue to next file even if one fails
  }
}

console.log('🎉 Master Seeding Finished!');
