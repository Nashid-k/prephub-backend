#!/bin/bash

# Script to update all seed files to use direct study order groups instead of AI categorization

echo "🔄 Updating all seed files to use direct study order..."

# List of seed files to update
SEED_FILES=(
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
)

cd src/seeds/topics

for file in "${SEED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "Processing: $file"
        
        # Replace the group assignment pattern
        # This uses sed to replace the AI assignGroup call with direct mainKey usage
        # Pattern 1: Add groupName = formatName(mainKey) after the for loop starts
        # Pattern 2: Replace group: await assignGroup(...) with group: groupName
        
        # First, check if file has the old pattern
        if grep -q "group: await assignGroup" "$file"; then
            echo "  ✅ Updating $file..."
            
            # Create backup
            cp "$file" "${file}.bak"
            
            # Note: Manual updates will be more reliable than sed for complex patterns
            echo "  ⚠️  Needs manual update or custom script"
        else
            echo "  ✓ Already updated"
        fi
    fi
done

echo ""
echo "📝 Note: Files need manual updates to:"
echo "1. Add: const groupName = formatName(mainKey);"
echo "2. Replace: group: await assignGroup(...) with group: groupName"
echo ""
echo "JavaScript seed has been updated as the template."
