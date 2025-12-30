import Topic from '../models/Topic.js';
import Section from '../models/Section.js';
import Category from '../models/Category.js';
import Question from '../models/Question.js';

/**
 * Get all topics with category counts and section counts
 */
export const getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find().sort({ order: 1 });
    
    // Get category counts and section counts for each topic
    const topicsWithCounts = await Promise.all(
      topics.map(async (topic) => {
        let categoryCount;
        if (topic.slug === 'dsa' || topic.slug === 'data-structures-algorithms') {
            // detailed logic for DSA Super Chapters (group prefixes)
            const distinctGroups = await Category.distinct('group', { topicId: topic._id });
            // Extract unique prefixes (e.g., "Blind 75" from "Blind 75:Array")
            const superChapters = new Set(distinctGroups.map(g => {
                return (g && g.includes(':')) ? g.split(':')[0].trim() : g;
            }));
            // If we have super chapters, count them. If generic/empty, might fall back or count 1.
            // Filter out 'general' if mixed? Assuming structure is consistent.
            categoryCount = superChapters.size;
        } else {
            categoryCount = await Category.countDocuments({ topicId: topic._id });
        }

        const sectionCount = await Section.countDocuments({ topicId: topic._id });
        return {
          ...topic.toObject(),
          categoryCount,
          sectionCount,
          totalSections: sectionCount
        };
      })
    );
    
    res.json({
      success: true,
      topics: topicsWithCounts
    });
  } catch (error) {
    console.error('Get Topics Error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to fetch topics' 
    });
  }
};

/**
 * Get topic by slug with sections
 */
export const getTopicBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    
    const topic = await Topic.findOne({ slug });
    
    if (!topic) {
      return res.status(404).json({ 
        error: 'Topic not found' 
      });
    }

    const sections = await Section.find({ topicId: topic._id }).sort({ order: 1 });

    res.json({
      success: true,
      topic,
      sections
    });
  } catch (error) {
    console.error('Get Topic Error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to fetch topic' 
    });
  }
};

/**
 * Get section by slug
 */
export const getSectionBySlug = async (req, res) => {
  try {
    const { topicSlug, sectionSlug } = req.params;
    
    const topic = await Topic.findOne({ slug: topicSlug });
    
    if (!topic) {
      return res.status(404).json({ 
        error: 'Topic not found' 
      });
    }

    const section = await Section.findOne({ 
      topicId: topic._id, 
      slug: sectionSlug 
    });

    if (!section) {
      return res.status(404).json({ 
        error: 'Section not found' 
      });
    }

    const questions = await Question.find({ 
      sectionId: section._id 
    }).limit(5);

    res.json({
      success: true,
      section,
      questions
    });
  } catch (error) {
    console.error('Get Section Error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to fetch section' 
    });
  }
};

export default {
  getAllTopics,
  getTopicBySlug,
  getSectionBySlug
};
