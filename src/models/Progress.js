import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: 'default-user' // For now, single user
  },
  sectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section',
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  questionsAnswered: [{
    questionId: mongoose.Schema.Types.ObjectId,
    answeredAt: Date,
    userAnswer: String
  }],
  lastAccessed: {
    type: Date,
    default: Date.now
  },
  timeSpent: {
    type: Number, // in minutes
    default: 0
  }
}, {
  timestamps: true
});

// Compound index for user and section
progressSchema.index({ userId: 1, sectionId: 1 }, { unique: true });

export default mongoose.model('Progress', progressSchema);
