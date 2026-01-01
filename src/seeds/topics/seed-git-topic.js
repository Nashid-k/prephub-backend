import mongoose from 'mongoose';
import Topic from '../../models/Topic.js';
import Category from '../../models/Category.js';
import Section from '../../models/Section.js';
import { assignGroup } from '../utils/categoryGrouping.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const gitData = {
  "Version_Control_Basics": {
    "01_introduction": [
      "What is Version Control?",
      "Git Architecture (Local vs Remote)",
      "Installing Git",
      "Configuring User Identity"
    ],
    "02_core_commands": [
      "Initializing a Repo (git init)",
      "Staging Changes (git add)",
      "Committing (git commit)",
      "Viewing History (git log)"
    ],
    "03_ignoring_files": [
      ".gitignore Patterns",
      "Global .gitignore",
      "Ignoring Tracked Files",
      "Best Practices"
    ]
  },
  "Branching_And_Merging": {
    "01_branch_management": [
      "Creating Branches",
      "Switching Contexts (checkout/switch)",
      "Deleting Branches",
      "Renaming Branches"
    ],
    "02_merging_strategies": [
      "Fast-Forward Merge",
      "Recursive Merge",
      "Squash Merging",
      "Rebasing Basics"
    ],
    "03_conflict_resolution": [
      "Identifying Conflicts",
      "Resolving Merge Conflicts",
      "Using Merge Tools",
      "Aborting Merges"
    ]
  },
  "Remote_Repositories": {
    "01_github_basics": [
      "Cloning Repositories",
      "Remote Management (git remote)",
      "Pushing Code (git push)",
      "Pulling Updates (git pull)"
    ],
    "02_collaboration_flow": [
      "Forking Projects",
      "Pull Requests (PRs)",
      "Code Review Process",
      "Syncing Forks"
    ]
  },
  "Advanced_Git_Tools": {
    "01_undoing_changes": [
      "Unstaging (git restore)",
      "Reverting Commits (git revert)",
      "Resetting Head (Soft/Hard Reset)",
      "Amending Commits"
    ],
    "02_productivity_tools": [
      "Stashing Changes (git stash)",
      "Cherry Picking",
      "Git Aliases",
      "Using Git Hooks"
    ],
    "03_debugging_history": [
      "Git Blame",
      "Git Bisect",
      "Reflog (Recovering Lost Commits)",
      "Visualizing Graph"
    ]
  },
  "GitHub_Workflow": {
    "01_project_management": [
      "Issues & Milestones",
      "GitHub Projects (Kanban)",
      "Markdown for Documentation",
      "Wiki Pages"
    ],
    "02_ci_cd_intro": [
      "GitHub Actions Basics",
      "Workflow Syntax",
      "Running Tests on Push",
      "Automated Deployment"
    ]
  },
  "Interview_Preparation": {
    "01_common_questions": [
      "Git Merge vs Rebase",
      "Git Fetch vs Git Pull",
      "Headless State",
      "Bare Repositories"
    ],
    "02_practical_scenarios": [
      "Fixing a Bad Commit",
      "Recovering Deleted Branch",
      "Squashing Last N Commits",
      "Handling Huge Binary Files"
    ]
  }
};

const formatName = (key) => {
  return key.split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const generateUniqueSlug = async (model, baseSlug, field = 'slug') => {
  let uniqueSlug = baseSlug;
  let counter = 1;
  while (await model.findOne({ [field]: uniqueSlug })) {
    uniqueSlug = `${baseSlug}-${counter}`;
    counter++;
  }
  return uniqueSlug;
};

const seedTopic = async () => {
  try {
    const topicSlug = 'git-version-control'; 
    const topicName = 'Git & GitHub';
    
    // 1. Find or Create Topic
    let topic = await Topic.findOne({ slug: topicSlug });
    if (!topic) {
      topic = await Topic.create({
        name: topicName,
        slug: topicSlug,
        description: 'Master version control systems and collaborative workflows with Git and GitHub.',
        icon: 'git', 
        order: 2 // After HTML/CSS
      });
      console.log(`Created Topic: ${topicName}`);
    } else {
      console.log(`Topic exists: ${topicName}`);
    }

    // 2. Refresh Categories
    console.log('Clearing existing categories...');
    await Category.deleteMany({ topicId: topic._id });
    
    // 3. Seed Categories & Sections
    let order = 1;
    for (const [categoryKey, categoryContent] of Object.entries(gitData)) {
      const categoryName = formatName(categoryKey);
      const categorySlug = await generateUniqueSlug(Category, categoryKey.toLowerCase().replace(/_/g, '-'));
      
      const group = await assignGroup(categoryName, topicSlug);
      
      const category = await Category.create({
        name: categoryName,
        slug: categorySlug,
        description: `Learn about ${categoryName}`,
        topicId: topic._id,
        group: group, 
        order: order++
      });
      
      console.log(`Created Category: ${categoryName} (Group: ${group})`);

      // Sections
      if (Array.isArray(categoryContent)) {
        // Simple list
        let sectionOrder = 1;
        for (const sectionTitle of categoryContent) {
            const sectionSlug = await generateUniqueSlug(Section, sectionTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
            
            await Section.create({
                topicId: topic._id, // Required
                categoryId: category._id,
                title: sectionTitle,
                slug: sectionSlug, // Required
                description: `Complete guide to ${sectionTitle} in Git & GitHub.`, // Required
                content: `Content for ${sectionTitle}`,
                order: sectionOrder++,
                isCompleted: false
            });
        }
        console.log(`  - Added ${categoryContent.length} sections`);
      } else {
         // Sub-categories logic
         let sectionOrder = 1;
         for (const [subKey, sections] of Object.entries(categoryContent)) {
             if (Array.isArray(sections)) {
                 for (const sectionTitle of sections) {
                    const sectionSlug = await generateUniqueSlug(Section, sectionTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                    
                    await Section.create({
                        topicId: topic._id,
                        categoryId: category._id,
                        title: sectionTitle,
                        slug: sectionSlug,
                        description: `Learn about ${sectionTitle} within ${formatName(subKey)}.`,
                        content: `Content for ${sectionTitle} (${formatName(subKey)})`,
                        order: sectionOrder++,
                        isCompleted: false
                    });
                 }
             }
         }
         console.log(`  - Added sections from sub-groups`);
      }
    }

    console.log('✅ Git & GitHub seeding complete!');
    
  } catch (error) {
    console.error('Error seeding Git:', error);
    process.exit(1);
  }
};

if (import.meta.url === `file://${process.argv[1]}`) {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/prephub')
    .then(() => seedTopic())
    .then(() => mongoose.disconnect())
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}

export default seedTopic;
