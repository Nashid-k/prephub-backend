import axios from 'axios';

const PISTON_API = 'https://emkc.org/api/v2/piston';

/**
 * Get list of supported languages
 */
export const getSupportedLanguages = async () => {
  try {
    const response = await axios.get(`${PISTON_API}/runtimes`);
    return response.data;
  } catch (error) {
    console.error('Piston API Error:', error);
    throw new Error('Failed to fetch supported languages');
  }
};

/**
 * Execute code in specified language
 */
export const executeCode = async (language, code, stdin = '') => {
  try {
    // Map common language names to Piston runtime names
    const languageMap = {
      'javascript': 'javascript',
      'typescript': 'typescript',
      'python': 'python',
      'java': 'java',
      'cpp': 'c++',
      'c++': 'c++',
      'c': 'c',
      'csharp': 'csharp',
      'go': 'go',
      'rust': 'rust',
      'ruby': 'ruby',
      'php': 'php',
      'swift': 'swift',
      'kotlin': 'kotlin'
    };

    const runtimeLanguage = languageMap[language.toLowerCase()] || language;

    const payload = {
      language: runtimeLanguage,
      version: '*', // Use latest version
      files: [
        {
          name: 'main',
          content: code
        }
      ],
      stdin: stdin,
      args: [],
      compile_timeout: 10000,
      run_timeout: 3000,
      compile_memory_limit: -1,
      run_memory_limit: -1
    };

    const response = await axios.post(`${PISTON_API}/execute`, payload);
    
    return {
      output: response.data.run.stdout || '',
      error: response.data.run.stderr || response.data.compile?.stderr || '',
      exitCode: response.data.run.code,
      success: response.data.run.code === 0
    };
  } catch (error) {
    console.error('Code Execution Error:', error);
    return {
      output: '',
      error: error.message || 'Failed to execute code',
      exitCode: 1,
      success: false
    };
  }
};

export default {
  getSupportedLanguages,
  executeCode
};
