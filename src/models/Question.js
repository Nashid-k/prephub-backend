import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  sectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section',
    required: true
  },
  type: {
    type: String,
    enum: ['practice', 'interview-theory', 'interview-practical'],
    required: true
  },
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  codeExample: {
    type: String,
    default: ''
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  tags: [String],
  hints: [String]
}, {
  timestamps: true
});

// Index for efficient querying
questionSchema.index({ sectionId: 1, type: 1 });

export default mongoose.model('Question', questionSchema);
