import mongoose from 'mongoose';

const topicRankingSchema = new mongoose.Schema({
    topicSlug: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        default: 0
    },
    lastAccessed: {
        type: Date,
        default: Date.now
    },
    accessCount: {
        type: Number,
        default: 0
    },
    totalTimeSpent: {
        type: Number, // seconds
        default: 0
    }
}, { _id: false });

const userPreferencesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
        index: true
    },
    topicRankings: [topicRankingSchema],
    interests: [String], // Tags like 'frontend', 'mobile', 'backend', 'dsa'
    learningPath: {
        type: String,
        enum: ['web', 'mobile', 'fullstack', 'dsa', 'mixed'],
        default: 'mixed'
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Method to update rankings
userPreferencesSchema.methods.updateRankings = function(newRankings) {
    this.topicRankings = newRankings;
    this.lastUpdated = new Date();
    return this.save();
};

// Method to get top topics
userPreferencesSchema.methods.getTopTopics = function(limit = 5) {
    return this.topicRankings
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(r => r.topicSlug);
};

const UserPreferences = mongoose.model('UserPreferences', userPreferencesSchema);

export default UserPreferences;
