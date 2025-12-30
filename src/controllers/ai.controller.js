import geminiService from '../services/gemini.service.js';

/**
 * Generate AI explanation
 */
export const explainTopic = async (req, res) => {
  try {
    const { topic, section, context } = req.body;

    if (!topic || !section) {
      return res.status(400).json({ 
        error: 'Topic and section are required' 
      });
    }

    const explanation = await geminiService.generateExplanation(topic, section, context);

    res.json({
      success: true,
      explanation
    });
  } catch (error) {
    console.error('Explain Topic Error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to generate explanation' 
    });
  }
};

/**
 * Answer a question
 */
export const askQuestion = async (req, res) => {
  try {
    const { question, context } = req.body;

    if (!question) {
      return res.status(400).json({ 
        error: 'Question is required' 
      });
    }

    const answer = await geminiService.answerQuestion(question, context);

    res.json({
      success: true,
      answer
    });
  } catch (error) {
    console.error('Ask Question Error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to answer question' 
    });
  }
};

/**
 * Generate a dynamic quiz
 */
export const generateQuiz = async (req, res) => {
  try {
    const { topic, section, regenerate } = req.body;

    if (!topic || !section) {
      return res.status(400).json({ 
        error: 'Topic and section are required' 
      });
    }

    const quiz = await geminiService.generateQuiz(topic, section, regenerate);

    res.json({
      success: true,
      quiz
    });
  } catch (error) {
    console.error('Generate Quiz Error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to generate quiz' 
    });
  }
};

export default {
  explainTopic,
  askQuestion,
  generateQuiz
};
