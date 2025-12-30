import Bookmark from '../models/Bookmark.js';

// @desc    Get all user bookmarks
// @route   GET /api/bookmarks
// @access  Private
export const getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ userId: req.user._id }).sort({ bookmarkedAt: -1 });
    res.json(bookmarks);
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    res.status(500).json({ message: 'Server error fetching bookmarks' });
  }
};

// @desc    Add a bookmark
// @route   POST /api/bookmarks
// @access  Private
export const addBookmark = async (req, res) => {
  try {
    const { type, itemId, title, description, topicSlug, categorySlug, slug, difficulty } = req.body;

    const bookmarkExists = await Bookmark.findOne({
      userId: req.user._id,
      type,
      itemId
    });

    if (bookmarkExists) {
      return res.status(400).json({ message: 'Item already bookmarked' });
    }

    const bookmark = await Bookmark.create({
      userId: req.user._id,
      type,
      itemId,
      title,
      description,
      topicSlug,
      categorySlug,
      slug,
      difficulty
    });

    res.status(201).json(bookmark);
  } catch (error) {
    console.error('Error adding bookmark:', error);
    res.status(500).json({ message: 'Server error adding bookmark' });
  }
};

// @desc    Remove a bookmark
// @route   DELETE /api/bookmarks/:id
// @access  Private
// NOTE: :id can be the Bookmark _id OR the itemId (for convenience)
export const removeBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findOne({
      userId: req.user._id,
      $or: [
          { _id: req.params.id }, // Check by DB ID
          { itemId: req.params.id } // Check by Item ID
      ]
    });

    if (bookmark) {
      await bookmark.deleteOne();
      res.json({ message: 'Bookmark removed' });
    } else {
      res.status(404).json({ message: 'Bookmark not found' });
    }
  } catch (error) {
    console.error('Error removing bookmark:', error);
    // If ID format is invalid, it's likely searching by itemId which failed, or vice versa.
    // We can try to handle it gracefully or just error.
    res.status(500).json({ message: 'Server error removing bookmark' });
  }
};

// @desc    Check if item is bookmarked
// @route   GET /api/bookmarks/check/:itemId
// @access  Private
export const checkBookmark = async (req, res) => {
    try {
        const bookmark = await Bookmark.findOne({
            userId: req.user._id,
            itemId: req.params.itemId
        });
        
        res.json({ isBookmarked: !!bookmark });
    } catch (error) {
        console.error('Error checking bookmark:', error);
        res.status(500).json({ message: 'Server error checking bookmark' });
    }
}

// @desc Sync local bookmarks to DB (for migration)
// @route POST /api/bookmarks/sync
// @access Private
export const syncBookmarks = async (req, res) => {
    try {
        const { bookmarks } = req.body; // Array of local bookmarks
        
        if (!Array.isArray(bookmarks)) {
            return res.status(400).json({ message: 'Invalid data format' });
        }

        const results = [];
        
        for (const b of bookmarks) {
            // Check existence
             const exists = await Bookmark.findOne({
                userId: req.user._id,
                type: b.type,
                itemId: b.id || b.itemId // specific handling for local storage format
             });

             if (!exists) {
                 const newBookmark = await Bookmark.create({
                     userId: req.user._id,
                     type: b.type,
                     itemId: b.id || b.itemId,
                     title: b.title,
                     description: b.description,
                     topicSlug: b.topicSlug,
                     categorySlug: b.categorySlug,
                     slug: b.slug,
                     difficulty: b.difficulty,
                     bookmarkedAt: b.bookmarkedAt || Date.now()
                 });
                 results.push(newBookmark);
             }
        }
        
        res.json({ message: `Synced ${results.length} bookmarks`, synced: results });

    } catch (error) {
        console.error('Error syncing bookmarks:', error);
        res.status(500).json({ message: 'Server error syncing bookmarks' });
    }
}
