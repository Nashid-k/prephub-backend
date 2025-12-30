import Topic from '../models/Topic.js';
import Section from '../models/Section.js';
import Category from '../models/Category.js';
import Question from '../models/Question.js';

/**
 * Get all topics with category counts and section counts
 */
export const getAllTopics = async (req, res) => {
  try {
    const topicsWithCounts = await Topic.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: 'topicId',
          as: 'categories'
        }
      },
      {
        $lookup: {
          from: 'sections',
          localField: '_id',
          foreignField: 'topicId',
          as: 'sections'
        }
      },
      {
        $sort: { order: 1 }
      },
      {
        $project: {
          name: 1,
          slug: 1,
          description: 1,
          icon: 1,
          color: 1,
          order: 1,
          categoryCount: { $size: '$categories' },
          sectionCount: { $size: '$sections' },
          totalSections: { $size: '$sections' }
        }
      }
    ]);
    
    // Note: Special handling for DSA super chapters is currently complex in aggregation
    // and might be better handled in the UI or a separate field.
    // For now, these counts provide a good overall view.

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
