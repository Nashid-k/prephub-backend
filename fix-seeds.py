#!/usr/bin/env python3
"""
Fix the broken seed files - properly format the group and order fields
"""

import re
import os

SEED_DIR = "src/seeds/topics"

# Files that might be broken
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

def fix_seed_file(filepath):
    """Fix broken order field in seed files"""
    print(f"📝 Fixing: {os.path.basename(filepath)}")
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Fix the broken line where order got merged with comment
    # Pattern: group: groupName, // Direct from seed structure!order: order++
    # Should be: group: groupName, // Direct from seed structure!\n                    order: order++
    
    pattern = r'group: (groupName|await assignGroup[^,]+),\s*//\s*Direct from seed structure!order: order\+\+'
    replacement = r'group: \1, // Direct from seed structure!\n                    order: order++'
    
    content_before = content
    content = re.sub(pattern, replacement, content)
    
    if content != content_before:
        # Write back
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"  ✅ Fixed")
        return True
    else:
        print(f"  ✓ No issues found")
        return False

def main():
    print("🔧 Fixing broken seed files...\n")
    
    fixed_count = 0
    for filename in SEED_FILES:
        filepath = os.path.join(SEED_DIR, filename)
        if os.path.exists(filepath):
            if fix_seed_file(filepath):
                fixed_count += 1
        else:
            print(f"  ⚠️  File not found: {filename}")
    
    print(f"\n✅ Fixed {fixed_count} seed files")

if __name__ == "__main__":
    main()
