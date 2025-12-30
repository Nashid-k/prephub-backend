import compilerService from '../services/compiler.service.js';

/**
 * Get supported languages
 */
export const getLanguages = async (req, res) => {
  try {
    const languages = await compilerService.getSupportedLanguages();
    
    res.json({
      success: true,
      languages
    });
  } catch (error) {
    console.error('Get Languages Error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to fetch languages' 
    });
  }
};

/**
 * Execute code
 */
export const executeCode = async (req, res) => {
  try {
    const { language, code, stdin } = req.body;

    if (!language || !code) {
      return res.status(400).json({ 
        error: 'Language and code are required' 
      });
    }

    const result = await compilerService.executeCode(language, code, stdin);

    res.json({
      success: result.success,
      ...result
    });
  } catch (error) {
    console.error('Execute Code Error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to execute code' 
    });
  }
};

export default {
  getLanguages,
  executeCode
};
