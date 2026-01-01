#!/usr/bin/env node
/**
 * Batch Update Script: Adds assignGroup import and usage to all seed-*-topic.js files
 * 
 * This script automatically updates all topic seed files to use the universal
 * category grouping utility instead of hardcoded 'general' values.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SEEDS_DIR = path.join(__dirname, '../topics');
const IMPORT_STATEMENT = "import { assignGroup } from '../utils/categoryGrouping.js';";

const updateSeedFile = (filePath) => {
    const filename = path.basename(filePath);
    console.log(`\n📝 Processing: ${filename}`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Skip if already has the import
    if (content.includes('assignGroup')) {
        console.log('  ✅ Already updated');
        return false;
    }

    // 1. Add import statement after other imports
    const lastImportMatch = content.match(/^import .+ from .+;$/gm);
    if (lastImportMatch) {
        const lastImport = lastImportMatch[lastImportMatch.length - 1];
        const importIndex = content.indexOf(lastImport) + lastImport.length;
        content = content.slice(0, importIndex) + '\n' + IMPORT_STATEMENT + content.slice(importIndex);
        modified = true;
        console.log('  ➕ Added import statement');
    }

    // 2. Replace hardcoded group values
    // Match patterns like: group: 'general', group: "general", group: 'General'
    const groupPatterns = [
        /group:\s*['"]general['"],?/gi,
        /group:\s*['"]General['"],?/gi,
        /group:\s*formatName\(mainKey\),?/g  // For files that use formatName
    ];

    // Extract topic slug from filename: seed-typescript-topic.js -> typescript
    const topicSlug = filename.replace('seed-', '').replace('-topic.js', '');

    for (const pattern of groupPatterns) {
        if (pattern.test(content)) {
            // Replace with assignGroup call
            content = content.replace(
                pattern,
                (match) => {
                    // Preserve trailing comma if it exists
                    const hasComma = match.trim().endsWith(',');
                    return `group: assignGroup(categoryName, '${topicSlug}')${hasComma ? ',' : ''}`;
                }
            );
            modified = true;
            console.log('  🔄 Updated group assignment');
        }
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('  ✅ File saved');
        return true;
    }

    console.log('  ⏭️  No changes needed');
    return false;
};

const main = () => {
    console.log('🚀 Starting batch update of seed files...\n');
    console.log(`📁 Target directory: ${SEEDS_DIR}\n`);

    const files = fs.readdirSync(SEEDS_DIR)
        .filter(f => f.startsWith('seed-') && f.endsWith('-topic.js'))
        .map(f => path.join(SEEDS_DIR, f));

    console.log(`📊 Found ${files.length} seed files to process`);

    let updatedCount = 0;
    for (const file of files) {
        if (updateSeedFile(file)) {
            updatedCount++;
        }
    }

    console.log(`\n\n✨ Batch update complete!`);
    console.log(`   Updated: ${updatedCount}/${files.length} files`);
    console.log(`\n💡 Next step: Re-run the affected seed scripts to apply grouping to database\n`);
};

main();
