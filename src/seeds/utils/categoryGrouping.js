import assignGroupWithAI from '../../services/categorization.service.js';

/**
 * Universal Category Grouping Utility - AI-Powered with Pattern Matching Fallback
 * 
 * Intelligently assigns groups to categories using AI analysis,
 * with robust pattern matching as fallback for when AI services are unavailable.
 */

/**
 * Pattern-based group assignment (FALLBACK ONLY)
 * @param {string} categoryName - The name of the category
 * @param {string} topicSlug - Optional topic slug for context-specific grouping
 * @returns {string} - The assigned group name
 */
const assignGroupByPattern = (categoryName, topicSlug = '') => {
    const lower = categoryName.toLowerCase();
    const topicLower = topicSlug.toLowerCase();

    // Fundamentals & Basics
    if (
        lower.includes('fundamentals') ||
        lower.includes('basics') ||
        lower.includes('introduction') ||
        lower.includes('getting started') ||
        lower.includes('setup') ||
        lower.includes('installation') ||
        lower.includes('overview') ||
        lower.match(/^(intro|introduction|basics?|fundamentals?|foundations?)$/i)
    ) {
        return 'Fundamentals';
    }

    // Core Concepts
    if (
        lower.includes('core') ||
        lower.includes('essential') ||
        lower.includes('key concept') ||
        lower.includes('syntax') ||
        lower.includes('data type') ||
        lower.includes('variable') ||
        lower.includes('operator')
    ) {
        return 'Core Concepts';
    }

    // Functions & Methods
    if (
        lower.includes('function') ||
        lower.includes('method') ||
        lower.includes('closure') ||
        lower.includes('callback') ||
        lower.includes('arrow function')
    ) {
        return 'Functions';
    }

    // OOP & Classes
    if (
        lower.includes('class') ||
        lower.includes('object') ||
        lower.includes('oop') ||
        lower.includes('object-oriented') ||
        lower.includes('inheritance') ||
        lower.includes('polymorphism') ||
        lower.includes('encapsulation') ||
        lower.includes('interface') ||
        lower.includes('abstract')
    ) {
        return 'Object-Oriented Programming';
    }

    // Async Programming
    if (
        lower.includes('async') ||
        lower.includes('promise') ||
        lower.includes('await') ||
        lower.includes('concurrent') ||
        lower.includes('parallel')
    ) {
        return 'Asynchronous Programming';
    }

    // Data Structures (for DSA topics)
    if (
        lower.includes('array') ||
        lower.includes('list') ||
        lower.includes('stack') ||
        lower.includes('queue') ||
        lower.includes('linked list') ||
        lower.includes('string')
    ) {
        return 'Linear Data Structures';
    }

    if (
        lower.includes('tree') ||
        lower.includes('graph') ||
        lower.includes('heap') ||
        lower.includes('trie')
    ) {
        return 'Non-Linear Data Structures';
    }

    if (lower.includes('hash')) {
        return 'Hashing';
    }

    // Algorithms
    if (
        lower.includes('sort') ||
        lower.includes('search') ||
        lower.includes('algorithm')
    ) {
        return 'Algorithms';
    }

    // Web Development
    if (
        lower.includes('http') ||
        lower.includes('request') ||
        lower.includes('api') ||
        lower.includes('rest') ||
        lower.includes('fetch')
    ) {
        return 'Web APIs';
    }

    if (
        lower.includes('dom') ||
        lower.includes('browser') ||
        lower.includes('window') ||
        lower.includes('document')
    ) {
        return 'Browser & DOM';
    }

    // File & I/O
    if (
        lower.includes('file') ||
        lower.includes('stream') ||
        lower.includes('i/o') ||
        lower.includes('input') ||
        lower.includes('output')
    ) {
        return 'File System & I/O';
    }

    // Database
    if (
        lower.includes('database') ||
        lower.includes('query') ||
        lower.includes('sql') ||
        lower.includes('crud') ||
        lower.includes('transaction')
    ) {
        return 'Database Operations';
    }

    // Error Handling
    if (
        lower.includes('error') ||
        lower.includes('exception') ||
        lower.includes('debug') ||
        lower.includes('testing')
    ) {
        return 'Error Handling & Testing';
    }

    // Advanced Topics
    if (
        lower.includes('advanced') ||
        lower.includes('performance') ||
        lower.includes('optimization') ||
        lower.includes('memory') ||
        lower.includes('design pattern')
    ) {
        return 'Advanced Topics';
    }

    // TypeScript-specific
    if (topicLower.includes('typescript')) {
        if (
            lower.includes('type') ||
            lower.includes('interface') ||
            lower.includes('generic') ||
            lower.includes('utility')
        ) {
            return 'Type System';
        }
        if (lower.includes('decorator')) {
            return 'Decorators';
        }
        if (lower.includes('configuration') || lower.includes('config')) {
            return 'Configuration';
        }
        if (lower.includes('enum')) {
            return 'Enumerations';
        }
        if (lower.includes('module') || lower.includes('namespace')) {
            return 'Modules & Namespaces';
        }
    }

    // React/Framework-specific
    if (topicLower.includes('react') || topicLower.includes('vue') || topicLower.includes('angular')) {
        if (lower.includes('hook') || lower.includes('lifecycle')) {
            return 'Component Lifecycle';
        }
        if (lower.includes('state') || lower.includes('props')) {
            return 'State Management';
        }
        if (lower.includes('routing')) {
            return 'Routing';
        }
    }

    // Module & Package Management
    if (
        lower.includes('module') ||
        lower.includes('package') ||
        lower.includes('import') ||
        lower.includes('export')
    ) {
        return 'Modules & Packages';
    }

    // Security
    if (
        lower.includes('security') ||
        lower.includes('authentication') ||
        lower.includes('authorization')
    ) {
        return 'Security';
    }

    // Best Practices
    if (
        lower.includes('best practice') ||
        lower.includes('style guide') ||
        lower.includes('convention') ||
        lower.includes('pattern')
    ) {
        return 'Best Practices';
    }

    // Project & Practice
    if (
        lower.includes('project') ||
        lower.includes('practice') ||
        lower.includes('exercise') ||
        lower.includes('interview')
    ) {
        return 'Practice & Projects';
    }

    // Default fallback
    return 'General';
};

/**
 * AI-powered group assignment with pattern matching fallback
 * @param {string} categoryName - The name of the category
 * @param {string} topicSlug - Optional topic slug for context-specific grouping
 * @returns {Promise<string>} - The assigned group name
 */
export const assignGroup = async (categoryName, topicSlug = '') => {
    try {
        // Try AI categorization first
        const aiResult = await assignGroupWithAI(categoryName, topicSlug);
        
        if (aiResult && aiResult.confidence >= 70) {
            // High confidence AI result - use it
            console.log(`✅ AI categorization: "${categoryName}" → "${aiResult.group}" (${aiResult.confidence}% confidence)`);
            return aiResult.group;
        } else if (aiResult && aiResult.confidence >= 50) {
            // Medium confidence - verify with pattern matching
            const patternResult = assignGroupByPattern(categoryName, topicSlug);
            
            // If pattern matched something specific (not "General"), prefer it
            if (patternResult !== 'General') {
                console.log(`⚠️ Medium AI confidence (${aiResult.confidence}%), using pattern match: "${patternResult}"`);
                return patternResult;
            }
            
            // Otherwise, trust AI even with medium confidence
            console.log(`✅ AI categorization (medium confidence): "${categoryName}" → "${aiResult.group}" (${aiResult.confidence}%)`);
            return aiResult.group;
        } else if (aiResult) {
            // Low confidence - fall back to pattern matching
            console.log(`⚠️ Low AI confidence (${aiResult.confidence}%), falling back to pattern matching`);
            return assignGroupByPattern(categoryName, topicSlug);
        }
    } catch (error) {
        console.error('❌ AI categorization failed:', error.message);
    }
    
    // AI failed completely - use pattern matching
    console.log('⚠️ AI unavailable, using pattern matching fallback');
    const patternResult = assignGroupByPattern(categoryName, topicSlug);
    
    // If pattern matching returns "General", make one more AI attempt with retries disabled
    if (patternResult === 'General') {
        try {
            console.log('⚠️ Pattern matching returned "General", retrying AI with lower threshold...');
            const retryResult = await assignGroupWithAI(categoryName, topicSlug);
            
            if (retryResult && retryResult.confidence >= 40) {
                console.log(`✅ AI retry successful: "${categoryName}" → "${retryResult.group}" (${retryResult.confidence}%)`);
                return retryResult.group;
            }
        } catch (retryError) {
            console.error('❌ AI retry failed:', retryError.message);
        }
    }
    
    return patternResult;
};

// For backward compatibility with sync usage in seeds
// This wrapper allows synchronous calls to work (but they return "General" immediately)
// Seed files should be updated to use async/await
export const assignGroupSync = (categoryName, topicSlug = '') => {
    console.warn('⚠️ WARNING: Using synchronous assignGroup - AI categorization skipped. Use async/await for AI features.');
    return assignGroupByPattern(categoryName, topicSlug);
};

export default assignGroup;

