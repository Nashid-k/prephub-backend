import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema({
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    required: true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  title: {
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
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    default: ''
  },
  codeExamples: [{
    language: String,
    code: String,
    explanation: String
  }],
  keyPoints: [String],
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  }
}, {
  timestamps: true
});

// Compound index for topic and slug
sectionSchema.index({ topicId: 1, slug: 1 }, { unique: true });

export default mongoose.model('Section', sectionSchema);
