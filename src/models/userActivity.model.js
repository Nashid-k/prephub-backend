import mongoose from 'mongoose';

const userActivitySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    topicSlug: {
        type: String,
        required: true,
        index: true
    },
    activityType: {
        type: String,
        enum: ['view', 'practice', 'complete', 'quiz'],
        required: true
    },
    duration: {
        type: Number, // seconds spent
        default: 0
    },
    metadata: {
        sectionSlug: String,
        categorySlug: String,
        problemSlug: String
    },
    timestamp: {
        type: Date,
        default: Date.now,
        index: true
    }
}, {
    timestamps: true
});

// Compound index for efficient queries
userActivitySchema.index({ userId: 1, topicSlug: 1, timestamp: -1 });
userActivitySchema.index({ userId: 1, timestamp: -1 });

// TTL index - auto-delete after 90 days
userActivitySchema.index({ timestamp: 1 }, { expireAfterSeconds: 90 * 24 * 60 * 60 });

const UserActivity = mongoose.model('UserActivity', userActivitySchema);

export default UserActivity;
