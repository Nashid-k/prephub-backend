import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: '📚'
  },
  order: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    default: '#6366f1'
  }
}, {
  timestamps: true
});

export default mongoose.model('Topic', topicSchema);
