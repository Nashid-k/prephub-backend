import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema({
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    required: [true, 'Topic ID is required'],
    index: true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    index: true
  },
  title: {
    type: String,
    required: [true, 'Section title is required'],
    trim: true,
    minlength: [2, 'Title must be at least 2 characters'],
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    lowercase: true,
    trim: true,
    match: [/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'],
    maxlength: [250, 'Slug cannot exceed 250 characters']
  },
  order: {
    type: Number,
    required: [true, 'Order is required'],
    min: [1, 'Order must be at least 1'],
    max: [10000, 'Order cannot exceed 10000'],
    validate: {
      validator: Number.isInteger,
      message: 'Order must be an integer'
    }
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    minlength: [10, 'Description must be at least 10 characters'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  content: {
    type: String,
    default: '',
    trim: true,
    maxlength: [50000, 'Content cannot exceed 50000 characters']
  },
  codeExamples: [{
    language: {
      type: String,
      trim: true,
      maxlength: [50, 'Language name cannot exceed 50 characters']
    },
    code: {
      type: String,
      trim: true,
      maxlength: [10000, 'Code example cannot exceed 10000 characters']
    },
    explanation: {
      type: String,
      trim: true,
      maxlength: [2000, 'Explanation cannot exceed 2000 characters']
    }
  }],
  keyPoints: {
    type: [String],
    validate: {
      validator: function(v) {
        return v.every(point => point.length <= 500);
      },
      message: 'Each key point cannot exceed 500 characters'
    }
  },
  difficulty: {
    type: String,
    enum: {
      values: ['beginner', 'intermediate', 'advanced'],
      message: '{VALUE} is not a valid difficulty level'
    },
    default: 'beginner',
    lowercase: true
  },
  estimatedMinutes: {
    type: Number,
    default: 15,
    min: [5, 'Estimated time must be at least 5 minutes'],
    max: [180, 'Estimated time cannot exceed 180 minutes'],
    validate: {
      validator: Number.isInteger,
      message: 'Estimated minutes must be an integer'
    }
  }
}, {
  timestamps: true
});

// CRITICAL INDEXES FOR PERFORMANCE
// Index 1: Original unique constraint
sectionSchema.index({ topicId: 1, slug: 1 }, { unique: true });

// Index 2: Category-based listing (most common query)
sectionSchema.index({ categoryId: 1, order: 1 });

// Index 3: Difficulty filtering
sectionSchema.index({ topicId: 1, difficulty: 1 });

// Index 4: Topic-based ordering
sectionSchema.index({ topicId: 1, order: 1 });

export default mongoose.model('Section', sectionSchema);
