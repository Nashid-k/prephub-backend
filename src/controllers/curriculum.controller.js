import Topic from '../models/Topic.js';
import Section from '../models/Section.js';
import Category from '../models/Category.js';
import Question from '../models/Question.js';
import Progress from '../models/Progress.js';

/**
 * Get all topics with category counts and section counts
 */
export const getAllTopics = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;
    
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
      // If user is logged in, look up their progress
      ...(userId ? [
        {
          $lookup: {
            from: 'progresses',
            let: { topicId: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$userId', new mongoose.Types.ObjectId(userId)] },
                      { $eq: ['$completed', true] }
                    ]
                  }
                }
              },
              // We need to ensure we only count progress for sections that belong to THIS topic
              {
                $lookup: {
                  from: 'sections',
                  localField: 'sectionId',
                  foreignField: '_id',
                  as: 'sectionInfo'
                }
              },
              { $unwind: '$sectionInfo' },
              {
                $match: {
                  $expr: { $eq: ['$sectionInfo.topicId', '$$topicId'] }
                }
              }
            ],
            as: 'userProgress'
          }
        }
      ] : []),
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
          totalSections: { $size: '$sections' },
          completedSections: userId ? { $size: '$userProgress' } : { $literal: 0 },
          progress: {
            $cond: {
              if: { $gt: [{ $size: '$sections' }, 0] },
              then: {
                $multiply: [
                  { $divide: [userId ? { $size: '$userProgress' } : 0, { $size: '$sections' }] },
                  100
                ]
              },
              else: 0
            }
          }
        }
      },
      {
        $addFields: {
          progress: { $round: ['$progress', 0] }
        }
      }
    ]);
    
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
 * Get topic aggregate data (Topic + Categories + Sections + Progress)
 */
export const getTopicAggregate = async (req, res) => {
  try {
    const { slug } = req.params;
    const userId = req.user ? req.user._id : 'default-user';

    const topic = await Topic.findOne({ slug });
    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }

    const [categories, sections, progressRecords] = await Promise.all([
      Category.find({ topicId: topic._id }).sort({ order: 1 }),
      Section.find({ topicId: topic._id }).sort({ order: 1 }),
      Progress.find({ userId, sectionId: { $in: await Section.distinct('_id', { topicId: topic._id }) } })
    ]);

    // Build progress map
    const progressMap = {};
    let completedSections = 0;
    
    // For category completion (simplified: a category is completed if all its sections are)
    categories.forEach(cat => {
      const catSections = sections.filter(s => s.categoryId && s.categoryId.toString() === cat._id.toString());
      if (catSections.length === 0) {
        progressMap[cat.slug] = false;
      } else {
        const catSectionIds = catSections.map(s => s._id.toString());
        const catCompletedCount = progressRecords.filter(p => catSectionIds.includes(p.sectionId.toString()) && p.completed).length;
        progressMap[cat.slug] = catCompletedCount === catSections.length;
      }
    });

    completedSections = progressRecords.filter(p => p.completed).length;
    const totalSections = sections.length;
    const percentage = totalSections > 0 ? Math.round((completedSections / totalSections) * 100) : 0;

    res.json({
      success: true,
      topic,
      categories,
      sections,
      progress: progressMap,
      stats: {
        totalSections,
        completedSections,
        percentage
      }
    });
  } catch (error) {
    console.error('Get Topic Aggregate Error:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get category aggregate data (Category + Sections + Topic + Progress)
 */
export const getCategoryAggregate = async (req, res) => {
  try {
    const { topicSlug, categorySlug } = req.params;
    const userId = req.user ? req.user._id : 'default-user';

    const topic = await Topic.findOne({ slug: topicSlug });
    if (!topic) return res.status(404).json({ error: 'Topic not found' });

    const category = await Category.findOne({ topicId: topic._id, slug: categorySlug });
    if (!category) return res.status(404).json({ error: 'Category not found' });

    const sections = await Section.find({ categoryId: category._id }).sort({ order: 1 });
    const sectionIds = sections.map(s => s._id);

    const progressRecords = await Progress.find({
      userId,
      sectionId: { $in: sectionIds }
    });

    const progressMap = {};
    sections.forEach(s => {
      const record = progressRecords.find(p => p.sectionId.toString() === s._id.toString());
      progressMap[s.slug] = record ? record.completed : false;
    });

    res.json({
      success: true,
      topic,
      category,
      sections,
      progress: progressMap
    });
  } catch (error) {
    console.error('Get Category Aggregate Error:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get section aggregate data (Section + Sibling Sections + Parent Category + Parent Topic)
 */
export const getSectionAggregate = async (req, res) => {
  try {
    const { topicSlug, sectionSlug } = req.params;
    const userId = req.user ? req.user._id : 'default-user';

    const topic = await Topic.findOne({ slug: topicSlug });
    if (!topic) return res.status(404).json({ error: 'Topic not found' });

    const section = await Section.findOne({ topicId: topic._id, slug: sectionSlug });
    if (!section) return res.status(404).json({ error: 'Section not found' });

    const [category, allTopicSections, progress, questions] = await Promise.all([
      section.categoryId ? Category.findById(section.categoryId) : Promise.resolve(null),
      Section.find({ topicId: topic._id }).sort({ order: 1 }),
      Progress.findOne({ userId, sectionId: section._id }),
      Question.find({ sectionId: section._id }).limit(5)
    ]);

    res.json({
      success: true,
      topic,
      category,
      section,
      allTopicSections, // Used for navigation/sidebar
      isCompleted: progress ? progress.completed : false,
      questions
    });
  } catch (error) {
    console.error('Get Section Aggregate Error:', error);
    res.status(500).json({ error: error.message });
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
  getTopicAggregate,
  getCategoryAggregate,
  getSectionAggregate,
  getSectionBySlug
};
