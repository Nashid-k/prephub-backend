import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Topic name is required'],
    unique: true,
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'],
    maxlength: [150, 'Slug cannot exceed 150 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    minlength: [10, 'Description must be at least 10 characters'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  icon: {
    type: String,
    default: '📚',
    trim: true,
    maxlength: [10, 'Icon cannot exceed 10 characters']
  },
  order: {
    type: Number,
    required: [true, 'Order is required'],
    min: [1, 'Order must be at least 1'],
    max: [1000, 'Order cannot exceed 1000'],
    validate: {
      validator: Number.isInteger,
      message: 'Order must be an integer'
    }
  },
  color: {
    type: String,
    default: '#6366f1',
    trim: true,
    match: [/^#[0-9A-Fa-f]{6}$/, 'Color must be a valid hex color code']
  }
}, {
  timestamps: true
});

export default mongoose.model('Topic', topicSchema);
