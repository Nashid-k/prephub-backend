import Category from '../models/Category.js';
import Section from '../models/Section.js';
import PathMap from '../models/PathMap.js';

/**
 * Get all categories for a topic with section counts
 * Supports experienceLevel filtering via PathMap
 */
export const getCategoriesByTopic = async (req, res) => {
  try {
    const { topicSlug } = req.params;
    const { experienceLevel } = req.query; // Get experience level from query params
    
    let categoryQuery = { topicId: req.topic._id };
    
    // Apply PathMap filtering if experienceLevel is provided
    if (experienceLevel) {
      const pathMap = await PathMap.findOne({ 
        topicId: req.topic._id, 
        experienceLevel 
      });
      
      if (pathMap && pathMap.visibleCategorySlugs && pathMap.visibleCategorySlugs.length > 0) {
        console.log(`[TopicPage API] PathMap filtering ${topicSlug}: ${pathMap.visibleCategorySlugs.length} categories for ${experienceLevel}`);
        categoryQuery.slug = { $in: pathMap.visibleCategorySlugs };
      } else {
        console.log(`[TopicPage API] No PathMap found for ${topicSlug} / ${experienceLevel}, returning all`);
      }
    }
    
    const categories = await Category.find(categoryQuery)
      .sort({ order: 1 });
    
    // Add section count to each category
    const categoriesWithCounts = await Promise.all(
      categories.map(async (category) => {
        const sectionCount = await Section.countDocuments({ categoryId: category._id });
        return {
          ...category.toObject(),
          sectionCount
        };
      })
    );
    
    res.json({ categories: categoriesWithCounts });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

/**
 * Get category with its sections (subcategories)
 */
export const getCategoryWithSections = async (req, res) => {
  try {
    const { topicSlug, categorySlug } = req.params;
    
    const category = await Category.findOne({
      topicId: req.topic._id,
      slug: categorySlug
    });
    
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    
    const sections = await Section.find({ categoryId: category._id })
      .sort({ order: 1 });
    
    res.json({ category, sections });
  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({ error: 'Failed to fetch category' });
  }
};
