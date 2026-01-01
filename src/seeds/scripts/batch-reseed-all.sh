#!/bin/bash

# Batch Re-Seed All Topics with AI Categorization
# This script runs all topic seed files sequentially to update the database
# with intelligent AI-powered category groupings

echo "🚀 Starting batch re-seeding of all topics with AI categorization..."
echo "=================================================="
echo ""

# Array of all topic seed files
SEED_FILES=(
    "seed-html-css-topic.js"
    "seed-git-topic.js"
    "seed-javascript-topic.js"
    "seed-typescript-topic.js"
    "seed-python-topic.js"
    "seed-react-topic.js"
    "seed-nodejs-topic.js"
    "seed-express-topic.js"
    "seed-mongodb-topic.js"
    "seed-nextjs-topic.js"
    "seed-angular-topic.js"
    "seed-c-topic.js"
    "seed-csharp-topic.js"
    "seed-java-topic.js"
    "seed-golang-topic.js"
    "seed-dart-topic.js"
    "seed-flutter-topic.js"
    "seed-django-topic.js"
    "seed-postgresql-topic.js"
    "seed-dsa-topic.js"
    "seed-machine-learning-topic.js"
    "seed-data-analyst-topic.js"
    "seed-dotnet-topic.js"
    "seed-aws-cloud-topic.js"
)

# Counter for tracking
TOTAL=${#SEED_FILES[@]}
CURRENT=0
SUCCESS=0
FAILED=0

# Run each seed file
for SEED_FILE in "${SEED_FILES[@]}"; do
    CURRENT=$((CURRENT + 1))
    echo "[$CURRENT/$TOTAL] Running: $SEED_FILE"
    echo "---------------------------------------------------"
    
    if node "src/seeds/topics/$SEED_FILE"; then
        SUCCESS=$((SUCCESS + 1))
        echo "✅ $SEED_FILE completed successfully"
    else
        FAILED=$((FAILED + 1))
        echo "❌ $SEED_FILE failed"
    fi
    
    echo ""
    echo "⏳ Cooling down for 5 seconds to prevent rate limiting..."
    sleep 5
done

# Summary
echo "=================================================="
echo "🎉 Batch re-seeding complete!"
echo ""
echo "📊 Summary:"
echo "   Total topics: $TOTAL"
echo "   ✅ Successful: $SUCCESS"
echo "   ❌ Failed: $FAILED"
echo ""

if [ $FAILED -eq 0 ]; then
    echo "🌟 All topics re-seeded successfully with AI categorization!"
else
    echo "⚠️  Some topics failed. Check logs above for details."
    exit 1
fi
