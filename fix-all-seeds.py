#!/usr/bin/env python3
"""
Comprehensively fix ALL seed files to properly use mainKey for groups.
This script handles both flat and nested data structures.
"""

import re
import os

SEED_DIR = "src/seeds/topics"

def fix_file_comprehensive(filepath):
    """Fix a seed file comprehensively"""
    filename = os.path.basename(filepath)
    print(f"\n📝 Processing: {filename}")
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Backup
    backup_path = filepath + '.backup'
    with open(backup_path, 'w') as f:
        f.write(content)
    
    changes_made = []
    
    # Find the data processing loop - look for different patterns
    
    # Pattern 1: Nested loop (like JavaScript)
    # for (const [mainKey, mainValue] of Object.entries(data)) {
    #     for (const [key, value] of Object.entries(mainValue)) {
    if 'for (const [mainKey, mainValue] of Object.entries(' in content:
        print("  → Detected nested loop structure (mainKey/mainValue)")
        
        # Add groupName after mainKey loop line if not present
        if 'const groupName = formatName(mainKey)' not in content:
            pattern = r'(for \(const \[mainKey, mainValue\] of Object\.entries\([^\)]+\)\) \{\s*\n)'
            replacement = r'\1            const groupName = formatName(mainKey);\n            \n'
            content = re.sub(pattern, replacement, content)
            changes_made.append("Added groupName declaration")
        
        # Replace group: await assignGroup(...) with group: groupName
        pattern = r'group: await assignGroup\([^)]+\)'
        if re.search(pattern, content):
            content = re.sub(pattern, 'group: groupName', content)
            changes_made.append("Replaced assignGroup with groupName")
    
    # Pattern 2: Direct iteration over data (like TypeScript)
    # for (const [key, value] of Object.entries(data)) {
    # OR for (const [key, value] of Object.entries(typescriptData.TypeScript)) {
    elif re.search(r'for \(const \[key, value\] of Object\.entries\([^)]*Data[^)]*\)\)', content):
        print("  → Detected direct loop structure (key/value)")
        
        # For this pattern, group should come from a constant or the topic name
        # Find the const groupName or set it to the topic name
        
        # Check if there's already a single group assignment
        if re.search(r'const\s+(\w+)Group\s*=', content):
            print("  → Already has group constant")
        else:
            # Get topic name from the file
            topic_match = re.search(r'slug:\s*[\'"](\w+)[\'"]', content)
            if topic_match:
                topic_name = topic_match.group(1).capitalize()
                
                # Add const group at the start of processing
                pattern = r'(let order = 1;\s*\n)'
                replacement = f'\\1        const defaultGroup = "{topic_name}";\n        \n'
                if 'const defaultGroup' not in content:
                    content = re.sub(pattern, replacement, content)
                    changes_made.append(f"Added defaultGroup = '{topic_name}'")
                
                # Replace group: assignGroup or group: groupName with group: defaultGroup
                content = re.sub(r'group: (?:await )?(?:assignGroup\([^)]+\)|groupName)', 'group: defaultGroup', content)
                changes_made.append("Set group to defaultGroup")
    
    # Fix any broken order fields
    pattern = r'group: ([^,]+),\s*//[^n]*order: order\+\+'
    if re.search(pattern, content):
        content = re.sub(pattern, r'group: \1,\n                    order: order++', content)
        changes_made.append("Fixed broken order field")
    
    # Write back
    with open(filepath, 'w') as f:
        f.write(content)
    
    if changes_made:
        print(f"  ✅ Changes:", ", ".join(changes_made))
        return True
    else:
        print(f"  ✓ No changes needed")
        return False

def main():
    print("🔧 Comprehensively fixing all seed files...\n")
    
    # Get all seed files
    seed_files = [f for f in os.listdir(SEED_DIR) if f.startswith('seed-') and f.endswith('.js')]
    seed_files.sort()
    
    fixed_count = 0
    for filename in seed_files:
        filepath = os.path.join(SEED_DIR, filename)
        if fix_file_comprehensive(filepath):
            fixed_count += 1
    
    print(f"\n✅ Processed {len(seed_files)} files, made changes to {fixed_count}")
    print("\n💾 Backups saved as .backup files")

if __name__ == "__main__":
    main()
