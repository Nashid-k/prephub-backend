import mongoose from 'mongoose';

const bookmarkSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Type of the bookmarked item: 'topic', 'category', 'section'
  type: {
    type: String,
    required: true,
    enum: ['topic', 'category', 'section']
  },
  // The unique identifier for the item (slug or id)
  itemId: {
    type: String,
    required: true
  },
  // Metadata for display purposes (to avoid joining multiple tables for simple lists)
  title: {
    type: String,
    required: true
  },
  description: String,
  topicSlug: String,
  categorySlug: String,
  slug: String, // The item's own slug
  difficulty: String,
  
  bookmarkedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Compound index to prevent duplicate bookmarks for the same item by the same user
bookmarkSchema.index({ userId: 1, type: 1, itemId: 1 }, { unique: true });

export default mongoose.model('Bookmark', bookmarkSchema);
