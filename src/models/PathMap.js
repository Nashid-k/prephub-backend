
import mongoose from 'mongoose';

const PathMapSchema = new mongoose.Schema({
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    required: true
  },
  experienceLevel: {
    type: String,
    enum: ['0-1_year', '1-3_years', '3-5_years'],
    required: true
  },
  visibleCategorySlugs: [{
    type: String
  }],
  learningStrategy: {
    type: String, 
    default: ''
  },
  version: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
});

// Compound index to ensure unique map per topic + level
PathMapSchema.index({ topicId: 1, experienceLevel: 1 }, { unique: true });

export default mongoose.model('PathMap', PathMapSchema);
