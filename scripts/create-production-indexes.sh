#!/bin/bash
# Create database indexes in production

echo "🔧 Creating production indexes for PrepHub..."
echo ""

# MongoDB connection
MONGO_URI="${MONGODB_URI}"

if [ -z "$MONGO_URI" ]; then
  echo "❌ Error: MONGODB_URI environment variable not set"
  exit 1
fi

echo "📊 Creating indexes on Category collection..."
mongosh "$MONGO_URI" --eval '
db.categories.createIndex({ topicId: 1, order: 1 }, { background: true });
db.categories.createIndex({ topicId: 1, group: 1, order: 1 }, { background: true });
db.categories.createIndex({ slug: 1 }, { unique: true, background: true });
print("✅ Category indexes created");
'

echo ""
echo "📊 Creating indexes on Section collection..."
mongosh "$MONGO_URI" --eval '
db.sections.createIndex({ categoryId: 1, order: 1 }, { background: true });
db.sections.createIndex({ topicId: 1, difficulty: 1 }, { background: true });
db.sections.createIndex({ topicId: 1, order: 1 }, { background: true });
print("✅ Section indexes created");
'

echo ""
echo "📊 Verifying indexes..."
mongosh "$MONGO_URI" --eval '
print("\nCategory indexes:");
printjson(db.categories.getIndexes());
print("\nSection indexes:");
printjson(db.sections.getIndexes());
'

echo ""
echo "✅ All indexes created successfully!"
echo "💡 Indexes created with background:true to avoid blocking production writes"
