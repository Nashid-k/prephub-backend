import Progress from '../models/Progress.js';
import Section from '../models/Section.js';
import Topic from '../models/Topic.js';
import Category from '../models/Category.js';

export const toggleSectionCompletion = async (req, res) => {
  try {
    const { topicSlug, sectionSlug, completed } = req.body;
    const userId = req.user ? req.user._id : 'default-user';

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
    const userId = req.user ? req.user._id : null;

    // 1. Get all topics
    const topics = await Topic.find({});

    // 2. Calculate progress for each topic
    const progressData = await Promise.all(topics.map(async (topic) => {
        // Find categories for this topic - sorted by order
        const categories = await Category.find({ topicId: topic._id }).sort({ order: 1 });
        const categoryIds = categories.map(c => c._id);
        const categoryMap = {}; // Id -> Slug
        categories.forEach(c => categoryMap[c._id.toString()] = c.slug);

        // Find sections for these categories - sorted by order
        const sections = await Section.find({ categoryId: { $in: categoryIds } }).sort({ order: 1 });
        const sectionIds = sections.map(s => s._id);
        
        const totalSections = sections.length;

        // If no user or no sections, return 0 progress
        if (!userId || totalSections === 0) {
            return {
                topicName: topic.name,
                topicSlug: topic.slug,
                totalSections: totalSections || 0,
                completedSections: 0,
                percentage: 0,
                color: topic.color || '#4ade80',
                icon: topic.icon || '📚',
                continueLink: `/topic/${topic.slug}`
            };
        }

        // Find ALL progress records for this user & topic
        const progressRecords = await Progress.find({
            userId,
            sectionId: { $in: sectionIds }
        });

        // Calculate stats
        const completedRecords = progressRecords.filter(p => p.completed);
        const completedCount = completedRecords.length;
        const percentage = Math.round((completedCount / totalSections) * 100);

        // Determine "Next Step"
        // Find the first section (by order) that is NOT completed
        let nextSectionLink = `/topic/${topic.slug}`; // Default fallback
        
        // Create a set of completed section IDs for fast lookup
        const completedSectionIds = new Set(completedRecords.map(p => p.sectionId.toString()));

        // Iterate through sections in order
        for (const section of sections) {
            if (!completedSectionIds.has(section._id.toString())) {
                // Found the first uncompleted section!
                const catSlug = categoryMap[section.categoryId.toString()];
                if (catSlug) {
                    nextSectionLink = `/topic/${topic.slug}/category/${catSlug}/section/${section.slug}`;
                    break;
                }
            }
        }

        return {
            topicName: topic.name,
            topicSlug: topic.slug,
            totalSections,
            completedSections: completedCount,
            percentage,
            color: topic.color || '#4ade80',
            icon: topic.icon || '📚',
            continueLink: nextSectionLink
        };
    }));

    res.json({ topics: progressData });

  } catch (error) {
    console.error('Error fetching all topics progress:', error);
    res.status(500).json({ message: 'Server error fetching global progress' });
  }
};
