import assignGroupBatch from './src/services/assignGroupBatch.service.js';
import dotenv from 'dotenv';

dotenv.config();

const testCategories = [
  { name: 'JavaScript Foundations', order: 1 },
  { name: 'Variables Scope', order: 2 },
  { name: 'Operators Expressions', order: 3 }
];

console.log('Testing AI batch categorization...\n');

const result = await assignGroupBatch(testCategories, 'javascript');

console.log('\nResult Map:');
result.forEach((group, category) => {
  console.log(`"${category}" => "${group}"`);
});

process.exit(0);
