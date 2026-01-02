import * as geminiService from '../services/gemini.service.js';

/**
 * Generate AI explanation
 */
export const explainTopic = async (req, res) => {
  try {
    const { topic, section, context, language = 'javascript', experienceLevel = 'advanced' } = req.body;

    if (!topic || !section) {
      return res.status(400).json({ 
        error: 'Topic and section are required' 
      });
    }

    const explanation = await geminiService.generateExplanation(topic, section, context, language, experienceLevel);

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
    const { question, context, language = 'javascript', experienceLevel = 'advanced' } = req.body;

    if (!question) {
      return res.status(400).json({ 
        error: 'Question is required' 
      });
    }

    const answer = await geminiService.answerQuestion(question, context, language, experienceLevel);

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
    const { topic, section, regenerate, language = 'javascript', content = '', experienceLevel = 'advanced' } = req.body;

    if (!topic || !section) {
      return res.status(400).json({ 
        error: 'Topic and section are required' 
      });
    }

    const quiz = await geminiService.generateQuiz(topic, section, regenerate, language, content, experienceLevel);

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

/**
 * Structure curriculum path
 */
export const structurePath = async (req, res) => {
  try {
    const { topics, pathName, experienceLevel } = req.body;
    if (!topics || !Array.isArray(topics) || !pathName) {
        return res.status(400).json({ error: 'Topics array and pathName are required' });
    }

    const structure = await geminiService.structureLearningPath(topics, pathName, experienceLevel);
    
    res.json({
        success: true,
        structure
    });
  } catch (error) {
    console.error('Structure Path Error:', error);
    res.status(500).json({ error: error.message || 'Failed to structure path' });
  }
};

/**
 * Translate code blocks from one language to another
 */
export const translateCode = async (req, res) => {
  try {
    const { codeBlocks, sourceLanguage, targetLanguage } = req.body;

    if (!codeBlocks || !Array.isArray(codeBlocks)) {
      return res.status(400).json({ 
        error: 'codeBlocks array is required' 
      });
    }

    if (!sourceLanguage || !targetLanguage) {
      return res.status(400).json({ 
        error: 'sourceLanguage and targetLanguage are required' 
      });
    }

    // Translate all code blocks in parallel
    const translated = await Promise.all(
      codeBlocks.map(code => 
        geminiService.translateCodeBlock(code, sourceLanguage, targetLanguage)
      )
    );

    res.json({
      success: true,
      translated
    });
  } catch (error) {
    console.error('Translate Code Error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to translate code' 
    });
  }

};

/**
 * Analyze Code (Review, Debug, Optimize)
 */
export const analyzeCode = async (req, res) => {
  try {
    const { code, mode = 'review', language = 'javascript', experienceLevel = 'advanced' } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Code is required' });
    }

    const analysis = await geminiService.analyzeCode(code, mode, language, experienceLevel);
    
    res.json({
      success: true,
      analysis // Markdown string
    });
  } catch (error) {
    console.error('Analyze Code Error:', error);
    res.status(500).json({ error: error.message || 'Failed to analyze code' });
  }
};

export default {
  explainTopic,
  askQuestion,
  generateQuiz,
  structurePath,
  translateCode,
  analyzeCode
};
