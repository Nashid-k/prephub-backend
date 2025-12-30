import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  description: String,
  icon: String,
  group: {
    type: String,
    default: 'general'
  }
}, {
  timestamps: true
});

// Index for faster lookups
CategorySchema.index({ topicId: 1, slug: 1 });

export default mongoose.model('Category', CategorySchema);
