import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const seedFiles = [
  'seed.js',

  'seed-mongodb-hierarchy.js',
  'seed-express-hierarchy.js',
  'seed-nodejs-hierarchy.js',
  'seed-react-hierarchy.js',
  'seed-javascript-hierarchy.js',
  'seed-typescript-hierarchy.js',
  'seed-postgresql-hierarchy.js',
  'seed-dsa-topic.js',
  'seed-dsa-datastructures.js',
  'seed-dsa-algorithms.js',
  'seed-dsa-blind75.js',
  'seed-system-design-hierarchy.js',
  'seed-caching-performance-hierarchy.js',
  'seed-security-engineering-hierarchy.js',
  'seed-api-design-hierarchy.js',
  'seed-concurrency-hierarchy.js',
  'seed-networking-hierarchy.js',
  'seed-os-hierarchy.js',
  'seed-devops-basics.js',
  'seed-product-thinking.js',
  'seed-testing-strategy.js',
  'seed-reliability-observability-hierarchy.js',
  'seed-code-quality-hierarchy.js'
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
