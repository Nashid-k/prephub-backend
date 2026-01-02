
import { generateExplanation, analyzeCode } from '../services/gemini.service.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const testAdaptive = async () => {
    console.log('🧪 Testing Adaptive AI...');

    const topic = 'react';
    const section = 'useEffect';
    const code = 'function App() { const [v, setV] = useState(0); useEffect(() => { setV(v+1) }); return <div>{v}</div> }';

    console.log('\n--- 👶 BEGINNER EXPLANATION ---');
    const beginnerExp = await generateExplanation(topic, section, '', 'javascript', 'beginner');
    console.log(beginnerExp.substring(0, 300) + '...\n');

    console.log('\n--- 🚀 ADVANCED EXPLANATION ---');
    const advancedExp = await generateExplanation(topic, section, '', 'javascript', 'advanced');
    console.log(advancedExp.substring(0, 300) + '...\n');

    console.log('\n--- 👶 BEGINNER DEBUG ---');
    const beginnerDebug = await analyzeCode(code, 'debug', 'javascript', 'beginner');
    console.log(beginnerDebug.substring(0, 300) + '...\n');

    console.log('\n--- 🚀 ADVANCED DEBUG ---');
    const advancedDebug = await analyzeCode(code, 'debug', 'javascript', 'advanced');
    console.log(advancedDebug.substring(0, 300) + '...\n');
};

testAdaptive();
