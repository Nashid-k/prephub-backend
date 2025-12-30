import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

// Initialize ElevenLabs client
const elevenlabs = new ElevenLabsClient({
    apiKey: ELEVENLABS_API_KEY
});

// Voice IDs for different languages
const VOICE_IDS = {
    'en-US': 'EXAVITQu4vr4xnSDxMaL', // Rachel - Natural conversational
    'hi-IN': 'pNInz6obpgDQGcFmaJgB', // Adam (multilingual)
    'ta-IN': 'pNInz6obpgDQGcFmaJgB', // Adam
    'ml-IN': 'pNInz6obpgDQGcFmaJgB'  // Adam
};

export const generateSpeech = async (req, res) => {
    try {
        const { text, language = 'en-US' } = req.body;

        if (!text) {
            return res.status(400).json({ error: 'Text is required' });
        }

        if (!ELEVENLABS_API_KEY) {
            return res.status(500).json({ error: 'ElevenLabs API key not configured' });
        }

        const voiceId = VOICE_IDS[language] || VOICE_IDS['en-US'];

        // Generate speech using ElevenLabs SDK
        const audioStream = await elevenlabs.textToSpeech.convert(voiceId, {
            text,
            model_id: 'eleven_multilingual_v2',
            output_format: 'mp3_44100_128',
            voice_settings: {
                stability: 0.5,
                similarity_boost: 0.75,
                style: 0.5,
                use_speaker_boost: true
            }
        });

        // Convert stream to buffer
        const chunks = [];
        for await (const chunk of audioStream) {
            chunks.push(chunk);
        }
        const audioBuffer = Buffer.concat(chunks);

        // Return audio as base64
        const audioBase64 = audioBuffer.toString('base64');
        res.json({ audio: audioBase64 });

    } catch (error) {
        console.error('ElevenLabs TTS Error:', error.message);
        res.status(500).json({ 
            error: 'Failed to generate speech',
            details: error.message
        });
    }
};

export default { generateSpeech };
