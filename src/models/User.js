import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  picture: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  emailPreferences: {
    weeklySummary: {
      type: Boolean,
      default: true
    },
    lastEmailSent: {
      type: Date
    },
    unsubscribeToken: {
      type: String,
      default: () => require('crypto').randomBytes(32).toString('hex')
    }
  }
});

export default mongoose.model('User', userSchema);
