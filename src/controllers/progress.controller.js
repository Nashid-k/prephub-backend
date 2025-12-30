import Progress from '../models/Progress.js';
import Section from '../models/Section.js';
import Topic from '../models/Topic.js';
import Category from '../models/Category.js';

export const toggleSectionCompletion = async (req, res) => {
  try {
    const { topicSlug, sectionSlug, completed } = req.body;
    
    // Generate unique user ID for anonymous users
    let userId;
    if (req.user) {
      userId = req.user._id;
    } else {
      // For anonymous users, use a session ID from headers or generate one
      userId = req.headers['x-session-id'] || 'default-user';
    }

    // Find the section first
    const section = await Section.findOne({ slug: sectionSlug });
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }

    // Find or create progress
    let progress = await Progress.findOne({ userId, sectionId: section._id });

    if (!progress) {
      progress = new Progress({
        userId,
        sectionId: section._id,
        completed: completed
      });
    } else {
      progress.completed = completed;
      progress.lastAccessed = Date.now();
    }

    await progress.save();

    res.json({ 
      success: true, 
      isCompleted: progress.completed 
    });

  } catch (error) {
    console.error('Error toggling progress:', error);
    res.status(500).json({ message: 'Server error marking progress' });
  }
};

export const getSectionProgress = async (req, res) => {
  try {
    const { topicSlug, sectionSlug } = req.params;
    const userId = req.user ? req.user._id : null;

    const section = await Section.findOne({ slug: sectionSlug });
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }

    let isCompleted = false;

    if (userId) {
        const progress = await Progress.findOne({ userId, sectionId: section._id });
        if (progress) isCompleted = progress.completed;
    }

    res.json({
        isCompleted
    });

  } catch (error) {
    console.error('Error fetching progress:', error);
    res.status(500).json({ message: 'Server error fetching progress' });
  }
};

export const getCategoryProgress = async (req, res) => {
  try {
    const { topicSlug, categorySlug } = req.params;
    const userId = req.user ? req.user._id : null;

    // 1. Find Topic and Category IDs
    const topic = await Topic.findOne({ slug: topicSlug });
    if (!topic) {
        return res.status(404).json({ message: 'Topic not found' });
    }

    const category = await Category.findOne({ slug: categorySlug, topicId: topic._id });
    if (!category) {
        return res.status(404).json({ message: 'Category not found' });
    }

    // 2. Find all sections for this category
    const sections = await Section.find({ categoryId: category._id });
    const sectionIds = sections.map(s => s._id);

    // 4. Create a map of { sectionSlug: isCompleted }
    const progressMap = {};
    
    if (!userId) {
        // If no user, all are false
        sections.forEach(s => progressMap[s.slug] = false);
    } else {
        const progressRecords = await Progress.find({ 
            userId, 
            sectionId: { $in: sectionIds } 
        });

        sections.forEach(section => {
            const record = progressRecords.find(p => p.sectionId.toString() === section._id.toString());
            progressMap[section.slug] = record ? record.completed : false;
        });
    }

    res.json({ progress: progressMap });

  } catch (error) {
    console.error('Error fetching category progress:', error);
    res.status(500).json({ message: 'Server error fetching progress' });
  }
};

export const getTopicProgress = async (req, res) => {
  try {
    const { topicSlug } = req.params;
    const userId = req.user ? req.user._id : null;

    // 1. Find Topic
    const topic = await Topic.findOne({ slug: topicSlug });
    if (!topic) {
        return res.status(404).json({ message: 'Topic not found' });
    }

    // 2. Find all Categories for this topic
    const categories = await Category.find({ topicId: topic._id });
    
    // 3. Find all Sections for these categories
    // We need to group sections by category to check completion
    const categoryIds = categories.map(c => c._id);
    const sections = await Section.find({ categoryId: { $in: categoryIds } });
    
    // 4. Find all Progress for these sections
    const sectionIds = sections.map(s => s._id);
    // 5. Build the map { categorySlug: isCompleted }
    const progressMap = {};

    // Get progress records ONLY if user exists
    let progressRecords = [];
    if (userId) {
        progressRecords = await Progress.find({ 
            userId, 
            sectionId: { $in: sectionIds } 
        });
    }

    // Calculate overall stats
    let totalSections = sectionIds.length;
    let completedSections = 0;

    categories.forEach(category => {
        // Get sections for this specific category
        const categorySections = sections.filter(s => s.categoryId.toString() === category._id.toString());
        
        if (categorySections.length === 0 || !userId) {
            progressMap[category.slug] = false; 
        } else {
            // Check if ALL sections are completed for the category map
            const allCompleted = categorySections.every(section => {
                const record = progressRecords.find(p => p.sectionId.toString() === section._id.toString());
                const isComplete = record && record.completed;
                if (isComplete) {
                    // This logic is slightly flawed for global count if we iterate categories, 
                    // but we can just count global progress separately or counting here carefully.
                    // Actually, simpler to count from progressRecords that match sectionIds.
                }
                return isComplete;
            });
            progressMap[category.slug] = allCompleted;
        }
    });

    // Count actual completed sections from the records that match our topic's sections
    if (userId) {
        completedSections = progressRecords.filter(p => p.completed).length;
    }

    const percentage = totalSections > 0 ? Math.round((completedSections / totalSections) * 100) : 0;

    res.json({ 
        progress: progressMap,
        stats: {
            totalSections,
            completedSections,
            percentage
        }
    });

  } catch (error) {
    console.error('Error fetching topic progress:', error);
    res.status(500).json({ message: 'Server error fetching topic progress' });
  }
};

export const getAllTopicsProgress = async (req, res) => {
  try {
    let userId;
    if (req.user) {
      userId = req.user.id || req.user._id;
    } else {
      userId = req.headers['x-session-id'] || 'default-user';
    }
    
    // Ensure userId is string for comparison since Progress stores it as String
    userId = userId.toString();

    const progressData = await Topic.aggregate([
      {
        $lookup: {
          from: 'sections',
          localField: '_id',
          foreignField: 'topicId',
          as: 'allSections'
        }
      },
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
            {
              $lookup: {
                from: 'sections',
                localField: 'sectionId',
                foreignField: '_id',
                as: 'section'
              }
            },
            { $unwind: '$section' },
            {
              $match: {
                $expr: { $eq: ['$section.topicId', '$$topicId'] }
              }
            }
          ],
          as: 'completedSectionsList'
        }
      },
      {
        $project: {
          topicName: '$name',
          topicSlug: '$slug',
          totalSections: { $size: '$allSections' },
          completedSections: { $size: '$completedSectionsList' },
          percentage: {
            $cond: {
              if: { $gt: [{ $size: '$allSections' }, 0] },
              then: {
                $round: [
                  {
                    $multiply: [
                      { $divide: [{ $size: '$completedSectionsList' }, { $size: '$allSections' }] },
                      100
                    ]
                  },
                  0
                ]
              },
              else: 0
            }
          },
          color: { $ifNull: ['$color', '#4ade80'] },
          icon: { $ifNull: ['$icon', '📚'] },
          incompleteSections: {
            $filter: {
              input: '$allSections',
              as: 'section',
              cond: {
                $not: {
                  $in: ['$$section._id', '$completedSectionsList.sectionId']
                }
              }
            }
          }
        }
      },
      {
        $sort: { order: 1 }
      }
    ]);

    // Post-process to add continueLink and handle slug lookup
    const categories = await Category.find({});
    const categoryMap = {};
    categories.forEach(c => categoryMap[c._id.toString()] = c.slug);

    const result = progressData.map(topic => {
      let nextSectionLink = `/topic/${topic.topicSlug}`;
      if (topic.incompleteSections && topic.incompleteSections.length > 0) {
        // Sort by order to find the ACTUAL first incomplete section
        const sortedIncomplete = topic.incompleteSections.sort((a, b) => (a.order || 0) - (b.order || 0));
        const firstIncomplete = sortedIncomplete[0];
        const catSlug = categoryMap[firstIncomplete.categoryId?.toString()];
        if (catSlug) {
          nextSectionLink = `/topic/${topic.topicSlug}/category/${catSlug}/section/${firstIncomplete.slug}`;
        }
      }

      return {
        topicName: topic.topicName,
        topicSlug: topic.topicSlug,
        totalSections: topic.totalSections,
        completedSections: topic.completedSections,
        percentage: topic.percentage,
        color: topic.color,
        icon: topic.icon,
        continueLink: nextSectionLink
      };
    });

    res.json({ topics: result });
  } catch (error) {
    console.error('Error fetching global progress:', error);
    res.status(500).json({ message: 'Server error fetching global progress' });
  }
};

export const updateTimeSpent = async (req, res) => {
  try {
    const { topicSlug, sectionSlug, minutes } = req.body;
    
    // Get user ID
    let userId;
    if (req.user) {
      userId = req.user._id;
    } else {
      userId = req.headers['x-session-id'] || 'default-user';
    }

    // Find the section
    const section = await Section.findOne({ slug: sectionSlug });
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }

    // Find or create progress
    let progress = await Progress.findOne({ userId, sectionId: section._id });

    if (!progress) {
      progress = new Progress({
        userId,
        sectionId: section._id,
        timeSpent: minutes
      });
    } else {
      // Increment time spent
      progress.timeSpent = (progress.timeSpent || 0) + minutes;
      progress.lastAccessed = Date.now();
    }

    await progress.save();

    res.json({ 
      success: true, 
      timeSpent: progress.timeSpent 
    });

  } catch (error) {
    console.error('Error updating time:', error);
    res.status(500).json({ message: 'Server error updating time' });
  }
};

export const getDueReviews = async (req, res) => {
  try {
    // Get user ID
    let userId;
    if (req.user) {
      userId = req.user._id;
    } else {
      userId = req.headers['x-session-id'] || 'default-user';
    }

    // Find all completed progress with review data
    const progressRecords = await Progress.find({
      userId,
      completed: true,
      'reviewData.nextReview': { $lte: new Date() } // Due for review
    }).populate('sectionId');

    // Enrich with topic and category info
    const enrichedReviews = [];
    for (const progress of progressRecords) {
      if (!progress.sectionId) continue;

      const section = progress.sectionId;
      const category = await Category.findById(section.categoryId);
      const topic = await Topic.findById(category?.topicId);

      enrichedReviews.push({
        _id: progress._id,
        sectionId: section._id,
        sectionName: section.name,
        sectionSlug: section.slug,
        categoryName: category?.name,
        categorySlug: category?.slug,
        topicName: topic?.name,
        topicSlug: topic?.slug,
        reviewData: progress.reviewData
      });
    }

    // Sort by next review date (earliest first)
    enrichedReviews.sort((a, b) => 
      new Date(a.reviewData.nextReview) - new Date(b.reviewData.nextReview)
    );

    res.json({ reviews: enrichedReviews });
  } catch (error) {
    console.error('Error fetching due reviews:', error);
    res.status(500).json({ message: 'Server error fetching reviews' });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { topicSlug, sectionSlug, quality } = req.body;
    
    // Validate quality (1-5)
    if (quality < 1 || quality > 5) {
      return res.status(400).json({ message: 'Quality must be between 1 and 5' });
    }

    // Get user ID
    let userId;
    if (req.user) {
      userId = req.user._id;
    } else {
      userId = req.headers['x-session-id'] || 'default-user';
    }

    // Find the section
    const section = await Section.findOne({ slug: sectionSlug });
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }

    // Find progress
    const progress = await Progress.findOne({ userId, sectionId: section._id });
    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }

    // Calculate next review using SM-2 algorithm
    const currentEF = progress.reviewData?.easeFactor || 2.5;
    const currentInterval = progress.reviewData?.interval || 1;
    const currentReviewCount = progress.reviewData?.reviewCount || 0;

    // SM-2 algorithm
    let newEF = currentEF + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    newEF = Math.max(1.3, newEF);

    let newInterval;
    let newReviewCount = currentReviewCount + 1;

    if (quality < 3) {
      // Poor recall - reset
      newInterval = 1;
      newReviewCount = 0;
    } else {
      // Good recall - increase interval
      if (currentReviewCount === 0) {
        newInterval = 1;
      } else if (currentReviewCount === 1) {
        newInterval = 6;
      } else {
        newInterval = Math.round(currentInterval * newEF);
      }
    }

    // Calculate next review date
    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + newInterval);

    // Update progress
    progress.reviewData = {
      nextReview,
      interval: newInterval,
      easeFactor: newEF,
      reviewCount: newReviewCount
    };
    progress.lastAccessed = Date.now();

    await progress.save();

    res.json({ 
      success: true, 
      reviewData: progress.reviewData
    });

  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ message: 'Server error updating review' });
  }
};

export const toggleCategoryCompletion = async (req, res) => {
  try {
    const { topicSlug, categorySlug, completed } = req.body;
    
    // Get user ID
    let userId;
    if (req.user) {
      userId = req.user._id;
    } else {
      userId = req.headers['x-session-id'] || 'default-user';
    }

    // 1. Find Topic and Category
    const topic = await Topic.findOne({ slug: topicSlug });
    if (!topic) return res.status(404).json({ message: 'Topic not found' });

    const category = await Category.findOne({ slug: categorySlug, topicId: topic._id });
    if (!category) return res.status(404).json({ message: 'Category not found' });

    // 2. Find all sections
    const sections = await Section.find({ categoryId: category._id });
    if (sections.length === 0) {
        return res.json({ success: true, message: 'No sections to update' });
    }

    // 3. Update Progress for all sections
    const operations = sections.map(section => ({
        updateOne: {
            filter: { userId, sectionId: section._id },
            update: { 
                $set: { 
                    completed: completed,
                    lastAccessed: Date.now()
                } 
            },
            upsert: true
        }
    }));

    if (operations.length > 0) {
        await Progress.bulkWrite(operations);
    }

    res.json({ success: true, completed });

  } catch (error) {
    console.error('Error toggling category progress:', error);
    res.status(500).json({ message: 'Server error updating category progress' });
  }
};

export const toggleTopicCompletion = async (req, res) => {
  try {
    const { topicSlug, completed } = req.body;

    // Get user ID
    let userId;
    if (req.user) {
      userId = req.user._id;
    } else {
      userId = req.headers['x-session-id'] || 'default-user';
    }

    // 1. Find Topic
    const topic = await Topic.findOne({ slug: topicSlug });
    if (!topic) return res.status(404).json({ message: 'Topic not found' });

    // 2. Find all categories and sections
    const categories = await Category.find({ topicId: topic._id });
    const categoryIds = categories.map(c => c._id);
    
    // Sections belonging to these categories OR directly to the topic (if any)
    const sections = await Section.find({ 
        $or: [
            { categoryId: { $in: categoryIds } },
            { topicId: topic._id }
        ]
    });

    if (sections.length === 0) {
        return res.json({ success: true, message: 'No sections to update' });
    }

    // 3. Update Progress
    const operations = sections.map(section => ({
        updateOne: {
            filter: { userId, sectionId: section._id },
            update: { 
                $set: { 
                    completed: completed,
                    lastAccessed: Date.now()
                } 
            },
            upsert: true
        }
    }));

    if (operations.length > 0) {
        await Progress.bulkWrite(operations);
    }

    res.json({ success: true, completed });

  } catch (error) {
    console.error('Error toggling topic progress:', error);
    res.status(500).json({ message: 'Server error updating topic progress' });
  }
};
