import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

// Initialize ElevenLabs client
const elevenlabs = new ElevenLabsClient({
    apiKey: ELEVENLABS_API_KEY
});

// Premium Voice IDs (Updated for better quality)
// You can find more at: https://elevenlabs.io/voices
const VOICE_IDS = {
    'en-US': 'cgSgspJ2msm6clMCkdW9', // Samara - Expressive storytelling
    'hi-IN': 'pNInz6obpgDQGcFmaJgB', // Adam - Multilingual
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

        console.log(`🎙️ Generating speech with ${language} voice...`);

        // Generate speech using ElevenLabs v3 (supports audio tags!)
        const audioStream = await elevenlabs.textToSpeech.convert(voiceId, {
            text, // Can include [whispers], [giggles], [sarcastically], etc.
            model_id: 'eleven_turbo_v2_5', // Fast & high-quality
            output_format: 'mp3_44100_128',
            voice_settings: {
                stability: 0.5,        // 0-1: Lower = more expressive
                similarity_boost: 0.8, // 0-1: Higher = more similar to original voice
                style: 0.5,           // 0-1: Exaggeration of style
                use_speaker_boost: true
            }
        });

        // Convert stream to buffer
        const chunks = [];
        for await (const chunk of audioStream) {
            chunks.push(chunk);
        }
        const audioBuffer = Buffer.concat(chunks);

        console.log(`✅ Generated ${audioBuffer.length} bytes of audio`);

        // Return audio as base64
        const audioBase64 = audioBuffer.toString('base64');
        res.json({ audio: audioBase64 });

    } catch (error) {
        console.error('❌ ElevenLabs TTS Error:', error.message);
        res.status(500).json({ 
            error: 'Failed to generate speech',
            details: error.message
        });
    }
};

export default { generateSpeech };
