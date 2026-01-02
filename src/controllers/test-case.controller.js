import * as geminiService from '../services/gemini.service.js';

/**
 * Generate test cases for a LeetCode problem
 */
export const generateTestCases = async (req, res) => {
  try {
    const { problemTitle, problemDescription, functionSignature } = req.body;

    if (!problemTitle) {
      return res.status(400).json({ 
        error: 'Problem title is required' 
      });
    }

    const prompt = `Generate comprehensive test cases for the LeetCode problem: "${problemTitle}"

${problemDescription ? `Problem Description: ${problemDescription}` : ''}
${functionSignature ? `Function Signature: ${functionSignature}` : ''}

Generate test cases in TWO categories:

1. **Sample Test Cases** (2-3 cases): Basic examples that demonstrate the problem
2. **Hidden Test Cases** (10-15 cases): Comprehensive coverage including:
   - Edge cases (empty input, single element, etc.)
   - Large inputs
   - Corner cases
   - Negative numbers (if applicable)
   - Duplicate values (if applicable)

Format as JSON:
{
  "sampleCases": [
    {
      "input": { "nums": [2,7,11,15], "target": 9 },
      "expected": [0,1],
      "description": "Basic case with solution at beginning"
    }
  ],
  "hiddenCases": [
    {
      "input": { "nums": [3,2,4], "target": 6 },
      "expected": [1,2]
    }
  ]
}

IMPORTANT: 
- Use actual JavaScript values (arrays, numbers, strings)
- Match the function signature parameters
- Ensure expected outputs are correct
- Hidden cases should NOT have descriptions`;

    const response = await geminiService.generateTestCases(prompt);

    res.json({
      success: true,
      testCases: response
    });
  } catch (error) {
    console.error('Generate Test Cases Error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to generate test cases' 
    });
  }
};

export default {
  generateTestCases
};
