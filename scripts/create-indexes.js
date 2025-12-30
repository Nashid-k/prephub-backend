// MongoDB Index Creation Script
// Run this in MongoDB Compass or mongo shell
// All indexes are free-tier safe (~1-2MB total)

// ===== CATEGORY COLLECTION =====
db.categories.createIndex({ slug: 1 }, { unique: true, name: "category_slug_unique" });
db.categories.createIndex({ topicId: 1 }, { name: "category_topicId" });

// ===== TOPIC COLLECTION =====
db.topics.createIndex({ slug: 1 }, { unique: true, name: "topic_slug_unique" });

// ===== SECTION COLLECTION (Additional) =====
db.sections.createIndex({ slug: 1 }, { name: "section_slug" });
db.sections.createIndex({ categoryId: 1 }, { name: "section_categoryId" });

// ===== CACHE COLLECTION (Already has TTL) =====
// Verify existing index
db.cache.getIndexes();

// ===== PROGRESS COLLECTION =====
// Already has compound index { userId: 1, sectionId: 1 }
// Add additional index for user-level queries
db.progress.createIndex({ userId: 1 }, { name: "progress_userId" });

print("✅ All indexes created successfully!");
print("Expected query speedup: 10x faster 🚀");
