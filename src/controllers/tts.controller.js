import axios from 'axios';

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const ELEVENLABS_API_URL = 'https://api.elevenlabs.io/v1';

// Voice IDs (you can change these to different voices)
const VOICE_IDS = {
    'en-US': 'EXAVITQu4vr4xnSDxMaL', // Rachel - Natural conversational
    'hi-IN': 'pNInz6obpgDQGcFmaJgB', // Adam (works well for Hindi)
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

        // Call ElevenLabs API
        const response = await axios.post(
            `${ELEVENLABS_API_URL}/text-to-speech/${voiceId}`,
            {
                text,
                model_id: 'eleven_multilingual_v2',
                voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.75,
                    style: 0.5,
                    use_speaker_boost: true
                }
            },
            {
                headers: {
                    'Accept': 'audio/mpeg',
                    'xi-api-key': ELEVENLABS_API_KEY,
                    'Content-Type': 'application/json'
                },
                responseType: 'arraybuffer'
            }
        );

        // Return audio as base64
        const audioBase64 = Buffer.from(response.data).toString('base64');
        res.json({ audio: audioBase64 });

    } catch (error) {
        console.error('ElevenLabs TTS Error:', error.response?.data || error.message);
        res.status(500).json({ 
            error: 'Failed to generate speech',
            details: error.response?.data?.detail || error.message
        });
    }
};

export default { generateSpeech };
