import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

// Initialize ElevenLabs client
const elevenlabs = new ElevenLabsClient({
    apiKey: ELEVENLABS_API_KEY
});

// Samara voice - Expressive storytelling (English)
const VOICE_ID = 'cgSgspJ2msm6clMCkdW9';

export const generateSpeech = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ error: 'Text is required' });
        }

        if (!ELEVENLABS_API_KEY) {
            return res.status(500).json({ error: 'ElevenLabs API key not configured' });
        }

        console.log(`🎙️ Generating speech for: "${text.substring(0, 50)}..."`);

        // Generate speech using ElevenLabs
        const audioStream = await elevenlabs.textToSpeech.convert(VOICE_ID, {
            text,
            model_id: 'eleven_turbo_v2_5',
            output_format: 'mp3_44100_128'
        });

        // Convert stream to buffer
        const chunks = [];
        for await (const chunk of audioStream) {
            chunks.push(chunk);
        }
        const audioBuffer = Buffer.concat(chunks);

        console.log(`✅ Generated ${audioBuffer.length} bytes`);

        // Return audio as base64
        res.json({ audio: audioBuffer.toString('base64') });

    } catch (error) {
        console.error('❌ ElevenLabs Error:', error);
        res.status(500).json({ 
            error: 'TTS failed',
            details: error.message
        });
    }
};

export default { generateSpeech };
