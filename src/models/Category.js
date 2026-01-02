import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    required: [true, 'Topic ID is required'],
    index: true
  },
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [100, 'Name cannot exceed 100 characters'],
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9\s&.\-()]+$/.test(v);
      },
      message: 'Name can only contain letters, numbers, spaces, &, ., -, and ()'
    }
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    lowercase: true,
    trim: true,
    match: [/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens only'],
    maxlength: [150, 'Slug cannot exceed 150 characters']
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
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters'],
    default: ''
  },
  icon: {
    type: String,
    trim: true,
    maxlength: [50, 'Icon cannot exceed 50 characters']
  },
  group: {
    type: String,
    default: 'general',
    trim: true,
    maxlength: [100, 'Group name cannot exceed 100 characters'],
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9\s&.\-()]+$/.test(v);
      },
      message: 'Group can only contain letters, numbers, spaces, &, ., -, and ()'
    }
  }
}, {
  timestamps: true
});

// CRITICAL INDEXES FOR PERFORMANCE
// Index 1: Topic-based listing with ordering (most common query)
CategorySchema.index({ topicId: 1, order: 1 });

// Index 2: Group-based navigation (frontend tabs)
CategorySchema.index({ topicId: 1, group: 1, order: 1 });

// Index 3: Fast slug lookup (unique identifier)
CategorySchema.index({ slug: 1 }, { unique: true });

// Index 4: Original index for backward compatibility
CategorySchema.index({ topicId: 1, slug: 1 });

export default mongoose.model('Category', CategorySchema);
