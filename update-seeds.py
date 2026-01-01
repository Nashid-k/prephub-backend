#!/usr/bin/env python3
"""
Update all seed files to use direct study order groups from mainKey
instead of AI categorization via assignGroup()
"""

import re
import os

SEED_DIR = "src/seeds/topics"

# Files to update (exclude javascript which is already done)
SEED_FILES = [
    "seed-typescript-topic.js",
    "seed-python-topic.js",
    "seed-react-topic.js",
    "seed-nodejs-topic.js",
    "seed-express-topic.js",
    "seed-mongodb-topic.js",
    "seed-nextjs-topic.js",
    "seed-angular-topic.js",
    "seed-c-topic.js",
    "seed-csharp-topic.js",
    "seed-java-topic.js",
    "seed-golang-topic.js",
    "seed-dart-topic.js",
    "seed-flutter-topic.js",
    "seed-django-topic.js",
    "seed-postgresql-topic.js",
    "seed-dsa-topic.js",
]

def update_seed_file(filepath):
    """Update a seed file to use mainKey for groups"""
    print(f"📝 Processing: {os.path.basename(filepath)}")
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Check if already updated
    if 'const groupName = formatName(mainKey)' in content:
        print(f"  ✓ Already updated")
        return False
    
    # Pattern 1: Find the for loop that iterates over entries
    # Look for: for (const [mainKey, mainValue] of Object.entries(...)) {
    # Add groupName line after it
    pattern1 = r'(for \(const \[mainKey, mainValue\] of Object\.entries\([^)]+\)\) \{\s*\n)'
    replacement1 = r'\1            const groupName = formatName(mainKey); // Use mainKey as group - maintains study order!\n            \n'
    
    content = re.sub(pattern1, replacement1, content)
    
    # Pattern 2: Replace group: await assignGroup(...) with group: groupName
    pattern2 = r'group: await assignGroup\([^)]+\)(,?\s*(?://.*)?)'
    replacement2 = r'group: groupName\1 // Direct from seed structure!'
    
    content = re.sub(pattern2, replacement2, content)
    
    # Write back
    with open(filepath, 'w') as f:
        f.write(content)
    
    print(f"  ✅ Updated successfully")
    return True

def main():
    print("🔄 Updating seed files to use direct study order...\n")
    
    updated_count = 0
    for filename in SEED_FILES:
        filepath = os.path.join(SEED_DIR, filename)
        if os.path.exists(filepath):
            if update_seed_file(filepath):
                updated_count += 1
        else:
            print(f"  ⚠️  File not found: {filename}")
    
    print(f"\n✅ Updated {updated_count} seed files")
    print("All seed files now use direct study order from mainKey!")

if __name__ == "__main__":
    main()
