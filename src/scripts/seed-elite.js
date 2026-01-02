
import dotenv from 'dotenv';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure dotenv
dotenv.config({ path: path.join(__dirname, '../../.env') });

console.log('🔍 DEBUG: MONGODB_URI loaded:', process.env.MONGODB_URI ? 'YES' : 'NO');
if (!process.env.MONGODB_URI) {
    console.error('❌ FATAL: MONGODB_URI is likely missing from .env');
    process.exit(1);
}

const rootDir = path.join(__dirname, '../../..');

const scripts = [
  // Core Languages - Hierarchy Runners
  'backend/src/seeds/hierarchy/seed-javascript-hierarchy.js',
  'backend/src/seeds/hierarchy/seed-nodejs-hierarchy.js',
  
  // Frameworks - Topic Runners
  'backend/src/seeds/topics/seed-react-topic.js',
  'backend/src/seeds/topics/seed-typescript-topic.js',
  
  // Specialized - Hierarchy Runners
  'backend/src/seeds/hierarchy/seed-security-engineering-hierarchy.js',

  // Angular
  'backend/src/seeds/topics/seed-angular-topic.js',

  // Python
  'backend/src/seeds/topics/seed-python-topic.js',

  // Java
  'backend/src/seeds/topics/seed-java-topic.js',

  // C
  'backend/src/seeds/topics/seed-c-topic.js',

  // HTML & CSS
  'backend/src/seeds/topics/seed-html-css-topic.js',

  // System Design
  'backend/src/seeds/topics/seed-system-design-topic.js',

  // AWS Cloud
  'backend/src/seeds/topics/seed-aws-cloud-topic.js',

  // PostgreSQL
  'backend/src/seeds/topics/seed-postgresql-topic.js',

  // Git
  'backend/src/seeds/topics/seed-git-topic.js',

  // Next.js
  'backend/src/seeds/topics/seed-nextjs-topic.js',

  // DSA - Algorithms Core
  'backend/src/seeds/dsa/seed-dsa-algorithms.js',

  // DSA - Data Structures & Blind 75
  'backend/src/seeds/dsa/seed-dsa-datastructures.js',
  'backend/src/seeds/dsa/seed-dsa-blind75.js'
];

const runScript = (scriptPath) => {
  return new Promise((resolve, reject) => {
    console.log(`\n🚀 Starting seed: ${scriptPath}`);
    
    const process = spawn('node', [scriptPath], {
      cwd: rootDir,
      stdio: 'inherit',
      env: { ...process.env, FORCE_COLOR: 'true' },
      shell: true
    });

    process.on('close', (code) => {
      if (code === 0) {
        console.log(`✅ Completed: ${scriptPath}`);
        resolve();
      } else {
        console.error(`❌ Failed: ${scriptPath} (Exit code: ${code})`);
        reject(new Error(`Script failed with code ${code}`));
      }
    });

    process.on('error', (err) => {
      console.error(`❌ Error starting ${scriptPath}:`, err);
      reject(err);
    });
  });
};

const main = async () => {
  console.log('🌟 Starting Elite Curriculum Seeding...');
  
  for (const script of scripts) {
    try {
      await runScript(script);
    } catch (error) {
      console.error('⚠️  Seeding sequence stopped due to error.');
      process.exit(1);
    }
  }
  
  console.log('\n✨ All Elite Curricula seeded successfully!');
};

main();
