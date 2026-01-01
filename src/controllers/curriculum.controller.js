import Topic from '../models/Topic.js';
import Section from '../models/Section.js';
import Category from '../models/Category.js';
import Progress from '../models/Progress.js';
import UserPreferences from '../models/userPreferences.model.js';
import PathMap from '../models/PathMap.js';

/**
 * Get all topics with category counts and section counts
 */
/**
 * Get all topics with category counts and section counts
 */
export const getAllTopics = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;
    const { experienceLevel } = req.query;
    
    // 1. Fetch Aggregation
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
                      { $eq: ['$userId', userId] },
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
      }
    ]);

    // 2. Fetch PathMaps if level provided
    let pathMaps = [];
    if (experienceLevel) {
        pathMaps = await PathMap.find({ experienceLevel }).lean();
    }

    // 3. Process Counts using JS (More robust than complex aggregation)
    const finalTopics = topicsWithCounts.map(topic => {
        let visibleCategories = topic.categories;
        let visibleSections = topic.sections;
        
        if (experienceLevel) {
            const map = pathMaps.find(p => p.topicId.toString() === topic._id.toString());
            if (map && map.visibleCategorySlugs?.length > 0) {
                 visibleCategories = topic.categories.filter(c => map.visibleCategorySlugs.includes(c.slug));
                 // Filter sections belonging to visible categories
                 const visibleCatIds = visibleCategories.map(c => c._id.toString());
                 visibleSections = topic.sections.filter(s => visibleCatIds.includes(s.categoryId?.toString()));
            }
        }

        const stats = {
            categoryCount: visibleCategories.length,
            sectionCount: visibleSections.length,
            totalSections: visibleSections.length,
        };
        
        // Recalculate progress based on filtered sections
        let completedSections = 0;
        
        if (topic.userProgress && topic.userProgress.length > 0) {
            const visibleSectionIds = visibleSections.map(s => s._id.toString());
            completedSections = topic.userProgress.filter(p => visibleSectionIds.includes(p.sectionId?.toString())).length;
        }
        
        let progress = 0;
        if (stats.totalSections > 0) {
            progress = Math.round((completedSections / stats.totalSections) * 100);
        }

        return {
            ...topic,
            categories: undefined, // Don't send heavy arrays
            sections: undefined,   // Don't send heavy arrays
            userProgress: undefined,
            ...stats,
            completedSections,
            progress
        };
    });
    
    res.json({
      success: true,
      topics: finalTopics
    });
  } catch (error) {
    console.error('Get Topics Error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to fetch topics' 
    });
  }
};

/**
 * Get personalized topics based on user activity
 */
// Simplified wrapper to reuse logic since filtering is now identical
export const getPersonalizedTopics = async (req, res) => {
    // We delegate to getAllTopics to ensure consistent filtering counts
    return getAllTopics(req, res);
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
    const { experienceLevel } = req.query; // Get experience level from query params
    const userId = req.user ? req.user._id : (req.headers['x-session-id'] || 'default-user');

    const topic = await Topic.findOne({ slug });
    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }

    // 1. Determine visible categories based on PathMap
    let categoryQuery = { topicId: topic._id };
    
    console.log(`[API] Fetching topic ${topic.slug}. ExpLevel: ${experienceLevel || 'NONE'}`);

    if (experienceLevel) {
      const pathMap = await PathMap.findOne({ topicId: topic._id, experienceLevel });
      if (pathMap && pathMap.visibleCategorySlugs && pathMap.visibleCategorySlugs.length > 0) {
        console.log(`[API] PathMap FOUND. Filtered ${topic.slug} to ${pathMap.visibleCategorySlugs.length} categories.`);
        categoryQuery.slug = { $in: pathMap.visibleCategorySlugs };
      } else {
        console.log(`[API] PathMap NOT found or empty for ${topic.slug} / ${experienceLevel}`);
      }
    }

    // 2. Fetch filtered categories and their sections
    const categories = await Category.find(categoryQuery).sort({ order: 1 });
    const categoryIds = categories.map(c => c._id);
    
    // 3. Fetch sections ONLY for these categories to ensure accurate counts
    const sections = await Section.find({ 
      topicId: topic._id, 
      categoryId: { $in: categoryIds } 
    }).sort({ order: 1 });

    const progressRecords = await Progress.find({ 
      userId, 
      sectionId: { $in: sections.map(s => s._id) } 
    });

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
    const userId = req.user ? req.user._id : (req.headers['x-session-id'] || 'default-user');

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
    const userId = req.user ? req.user._id : (req.headers['x-session-id'] || 'default-user');

    const topic = await Topic.findOne({ slug: topicSlug });
    if (!topic) return res.status(404).json({ error: 'Topic not found' });

    const section = await Section.findOne({ topicId: topic._id, slug: sectionSlug });
    if (!section) return res.status(404).json({ error: 'Section not found' });

    const [category, allTopicSections, progress] = await Promise.all([
      section.categoryId ? Category.findById(section.categoryId) : Promise.resolve(null),

      // Fetch all sections sorted by Category Order then Section Order
      Section.aggregate([
        { $match: { topicId: topic._id } },
        {
          $lookup: {
            from: 'categories',
            localField: 'categoryId',
            foreignField: '_id',
            as: 'category'
          }
        },
        { $unwind: { path: '$category', preserveNullAndEmptyArrays: false } },
        { $sort: { 'category.order': 1, 'order': 1 } },
        {
          $project: {
            _id: 1,
            title: 1,
            slug: 1,
            categoryId: 1,
            topicId: 1,
            difficulty: 1,
            order: 1,
            category: {
              name: '$category.name',
              group: '$category.group'
            }
          }
        }
      ]),
      Progress.findOne({ userId, sectionId: section._id })
    ]);

    res.json({
      success: true,
      topic,
      category,
      section,
      allTopicSections, // Used for navigation/sidebar
      isCompleted: progress ? progress.completed : false
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

    res.json({
      success: true,
      section
    });
  } catch (error) {
    console.error('Get Section Error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to fetch section' 
    });
  }
};

/**
 * Get Topic Static (No User Progress) - Globally Cacheable
 * Free-tier optimized with .lean() and minimal queries
 */
export const getTopicStatic = async (req, res) => {
  try {
    const { slug } = req.params;

    // Single query with .lean() for faster, lighter response
    const topic = await Topic.findOne({ slug }).lean();
    if (!topic) return res.status(404).json({ error: 'Topic not found' });

    const categories = await Category.find({ topicId: topic._id }).lean();

    const data = { topic, categories };

    // HTTP Cache headers for browser/CDN caching (24 hours)
    res.set({
      'Cache-Control': 'public, max-age=86400',
      'Vary': 'Accept-Encoding'
    });

    res.json(data);
  } catch (error) {
    console.error('Get Topic Static Error:', error);
    res.status(500).json({ error: 'Failed to fetch topic' });
  }
};

/**
 * Get Category Static (No User Progress) - Globally Cacheable
 */
export const getCategoryStatic = async (req, res) => {
  try {
    const { topicSlug, categorySlug } = req.params;

    const topic = await Topic.findOne({ slug: topicSlug }).lean();
    if (!topic) return res.status(404).json({ error: 'Topic not found' });

    const category = await Category.findOne({ 
      topicId: topic._id, 
      slug: categorySlug 
    }).lean();
    if (!category) return res.status(404).json({ error: 'Category not found' });

    const sections = await Section.find({ categoryId: category._id }).lean();

    const data = { topic, category, sections };

    // HTTP Cache headers
    res.set({
      'Cache-Control': 'public, max-age=86400',
      'Vary': 'Accept-Encoding'
    });

    res.json(data);
  } catch (error) {
    console.error('Get Category Static Error:', error);
    res.status(500).json({ error: 'Failed to fetch category' });
  }
};

/**
 * Get Section Static (No User Progress) - Globally Cacheable
 */
export const getSectionStatic = async (req, res) => {
  try {
    const { topicSlug, sectionSlug } = req.params;

    const topic = await Topic.findOne({ slug: topicSlug }).lean();
    if (!topic) return res.status(404).json({ error: 'Topic not found' });

    const section = await Section.findOne({ slug: sectionSlug }).lean();
    if (!section) return res.status(404).json({ error: 'Section not found' });

    const category = await Category.findById(section.categoryId).lean();
    const siblingSections = await Section.find({ categoryId: section.categoryId }).lean();

    const data = {
      section,
      topic,
      category,
      siblingSections
    };

    // HTTP Cache headers
    res.set({
      'Cache-Control': 'public, max-age=86400',
      'Vary': 'Accept-Encoding'
    });

    res.json(data);
  } catch (error) {
    console.error('Get Section Static Error:', error);
    res.status(500).json({ error: 'Failed to fetch section' });
  }
};

export default {
  getAllTopics,
  getTopicBySlug,
  getTopicAggregate,
  getCategoryAggregate,
  getSectionAggregate,
  getSectionBySlug,
  // New static endpoints
  getTopicStatic,
  getCategoryStatic,
  getSectionStatic,
  // Personalized endpoints
  getPersonalizedTopics
};
