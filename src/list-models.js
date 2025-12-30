
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  // Note: ListModels isn't directly exposed in the high-level helper often, building it manually or using a known reliable model is easier.
  // But let's try to just hit the API or generic model.
  
  // Actually, the SDK doesn't have a simple "listModels" helper in the main class export easily accessible without digging.
  // Instead, I will try the known documented string 'gemini-1.5-flash-001' which is the specific version, or revisit 'gemini-pro'.
  
  console.log('Testing specific versions...');
  const versions = ['gemini-1.5-flash-001', 'gemini-1.5-flash-8b', 'gemini-1.5-pro', 'gemini-1.0-pro'];
  
  for (const v of versions) {
      console.log(`Checking ${v}...`);
      try {
        const model = genAI.getGenerativeModel({ model: v });
        const result = await model.generateContent('Hi');
        console.log(`✅ SUCCESS: ${v}`);
        return; 
      } catch (e) {
          console.log(`❌ FAILED ${v}: ${e.message.split('[')[0]}`); // Short log
      }
  }
}

listModels();
