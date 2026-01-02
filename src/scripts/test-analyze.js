
import { analyzeCode } from '../services/gemini.service.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const testAnalyze = async () => {
    console.log('🧪 Testing AI Code Analysis...');
    
    const buggyCode = `
    function checkLogin(user) {
        if (user.role = "admin") {
            return true;
        }
        return false;
    }
    `;

    console.log('\n--- Mode: DEBUG ---');
    const debugResult = await analyzeCode(buggyCode, 'debug', 'javascript');
    console.log(debugResult.substring(0, 500) + '...\n'); // Preview

    const slowCode = `
    function findDuplicate(arr) {
        for(let i=0; i<arr.length; i++) {
            for(let j=0; j<arr.length; j++) {
                if(i !== j && arr[i] === arr[j]) return arr[i];
            }
        }
    }
    `;

    console.log('\n--- Mode: OPTIMIZE ---');
    const optimizeResult = await analyzeCode(slowCode, 'optimize', 'javascript');
    console.log(optimizeResult.substring(0, 500) + '...\n'); // Preview
};

testAnalyze();
