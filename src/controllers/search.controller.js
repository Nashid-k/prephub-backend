import Topic from '../models/Topic.js';
import Section from '../models/Section.js';
import Category from '../models/Category.js';

// Search across topics, categories, and sections
export const searchContent = async (req, res) => {
  try {
    const { query, difficulty, limit = 20 } = req.query;

    if (!query || query.trim().length < 2) {
      return res.status(400).json({ 
        error: 'Search query must be at least 2 characters' 
      });
    }

    const searchRegex = new RegExp(query, 'i');
    const searchLimit = Math.min(parseInt(limit), 50); // Max 50 results

    // Build difficulty filter
    const difficultyFilter = difficulty ? { difficulty } : {};

    // Search in parallel
    const [topics, categories, sections] = await Promise.all([
      // Search topics
      Topic.find({
        $or: [
          { title: searchRegex },
          { description: searchRegex }
        ]
      })
        .select('title slug description icon')
        .limit(searchLimit)
        .lean(),

      // Search categories
      Category.find({
        $or: [
          { title: searchRegex },
          { description: searchRegex }
        ]
      })
        .populate('topicId', 'title slug')
        .select('title slug description topicId')
        .limit(searchLimit)
        .lean(),

      // Search sections
      Section.find({
        ...difficultyFilter,
        $or: [
          { title: searchRegex },
          { description: searchRegex },
          { keyPoints: searchRegex }
        ]
      })
        .populate('topicId', 'title slug')
        .populate('categoryId', 'title slug')
        .select('title slug description difficulty keyPoints topicId categoryId')
        .limit(searchLimit)
        .lean()
    ]);

    // Format results with type and relevance
    const results = {
      topics: topics.map(t => ({ ...t, type: 'topic' })),
      categories: categories.map(c => ({ ...c, type: 'category' })),
      sections: sections.map(s => ({ ...s, type: 'section' })),
      total: topics.length + categories.length + sections.length
    };

    res.json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Search failed' });
  }
};

// Get search suggestions (autocomplete)
export const getSearchSuggestions = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim().length < 2) {
      return res.json({ suggestions: [] });
    }

    const searchRegex = new RegExp(`^${query}`, 'i');

    // Get top 5 suggestions from each type
    const [topicSuggestions, sectionSuggestions] = await Promise.all([
      Topic.find({ title: searchRegex })
        .select('title slug')
        .limit(5)
        .lean(),
      
      Section.find({ title: searchRegex })
        .select('title slug')
        .limit(5)
        .lean()
    ]);

    const suggestions = [
      ...topicSuggestions.map(t => ({ text: t.title, type: 'topic', slug: t.slug })),
      ...sectionSuggestions.map(s => ({ text: s.title, type: 'section', slug: s.slug }))
    ];

    res.json({ suggestions: suggestions.slice(0, 8) });
  } catch (error) {
    console.error('Suggestions error:', error);
    res.status(500).json({ error: 'Failed to get suggestions' });
  }
};

export default {
  searchContent,
  getSearchSuggestions
};
