import mongoose from 'mongoose';
import Topic from '../../models/Topic.js';
import Category from '../../models/Category.js';
import Section from '../../models/Section.js';
import PathMap from '../../models/PathMap.js';
import { assignGroup } from '../utils/categoryGrouping.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const mlData = {
  "01_Math_Foundations": {
    "linear_algebra": [
      "Vectors and Matrices",
      "Matrix Multiplication",
      "Eigenvalues and Eigenvectors",
      "Dimensionality Reduction"
    ],
    "calculus": [
      "Derivatives & Gradients",
      "Chain Rule",
      "Gradient Descent",
      "Partial Derivatives"
    ],
    "probability_statistics": [
      "Probability Distributions",
      "Hypothesis Testing",
      "Bayes Theorem",
      "Descriptive Statistics"
    ]
  },
  "02_Data_Handling": {
    "preprocessing": [
      "Handling Missing Values",
      "Feature Scaling (Normalization)",
      "Encoding Categorical Data",
      "Train/Test/Validation Split"
    ],
    "eda": [
      "Data Visualization Patterns",
      "Correlation Analysis",
      "Outlier Detection",
      "Feature Engineering"
    ]
  },
  "03_Supervised_Learning": {
    "regression": [
      "Linear Regression",
      "Polynomial Regression",
      "Loss Functions (MSE/MAE)",
      "Regularization (L1/L2)"
    ],
    "classification": [
      "Logistic Regression",
      "Decision Trees & Random Forest",
      "Support Vector Machines (SVM)",
      "K-Nearest Neighbors (KNN)"
    ]
  },
  "04_Unsupervised_Learning": {
    "clustering": [
      "K-Means Clustering",
      "Hierarchical Clustering",
      "DBSCAN",
      "Cluster Evaluation"
    ],
    "dimensionality_reduction": [
      "Principal Component Analysis (PCA)",
      "t-SNE vs UMAP",
      "Autoencoders Basics",
      "LD Analysis"
    ]
  },
  "05_Deep_Learning_Fundamentals": {
    "neural_networks": [
      "Perceptrons & Neurons",
      "Activation Functions (ReLU/Sigmoid)",
      "Forward Propagation",
      "Backpropagation algorithm"
    ],
    "optimization": [
      "Stochastic Gradient Descent",
      "Adam Optimizer",
      "Learning Rate Scheduling",
      "Batch Normalization"
    ]
  },
  "06_Advanced_Architectures": {
    "computer_vision": [
      "Convolutional Neural Networks (CNN)",
      "Pooling Layers",
      "Transfer Learning (ResNet/VGG)",
      "Object Detection Basics"
    ],
    "nlp": [
      "Recurrent Neural Networks (RNN)",
      "LSTMs & GRUs",
      "Transformers & Attention",
      "BERT & GPT Architecture"
    ]
  },
  "08_Natural_Language_Processing": {
    "nlp_foundations": [
      "Text Preprocessing (Tokenization, Stemming)",
      "Bag of Words & TF-IDF",
      "Word Embeddings (Word2Vec, GloVe)",
      "RNNs and LSTMs for Text"
    ],
    "transformers_llms": [
      "Attention Mechanism Explained",
      "BERT Architecture & Fine-tuning",
      "GPT Architecture Basics",
      "Prompt Engineering",
      "Hugging Face Ecosystem"
    ]
  },
  "09_Reinforcement_Learning": {
    "rl_basics": [
      "Agent, Environment, Reward",
      "Markov Decision Processes (MDP)",
      "Q-Learning Algorithm",
      "Exploration vs Exploitation"
    ],
    "deep_rl": [
      "Deep Q-Networks (DQN)",
      "Policy Gradients",
      "Actor-Critic Methods",
      "Proximal Policy Optimization (PPO)"
    ]
  },
  "07_MLOps_Deployment": {
    "model_deployment": [
      "Serving Models with Flask/FastAPI",
      "Model Serialization (Pickle/ONNX)",
      "Docker for ML",
      "TF Serving / TorchServe"
    ],
    "lifecycle": [
      "Experiment Tracking (MLflow)",
      "Model Monitoring (Drift)",
      "Feature Stores",
      "CI/CD for Machine Learning"
    ]
  }
};

const formatName = (key) => {
  // Remove 01_ 02_ prefix and replace underscores with spaces
  return key.replace(/^[0-9]+_/, '').split('_')
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
    const topicSlug = 'machine-learning'; 
    const topicName = 'Machine Learning';
    
    // 1. Find or Create Topic
    let topic = await Topic.findOne({ slug: topicSlug });
    if (!topic) {
      topic = await Topic.create({
        name: topicName,
        slug: topicSlug,
        description: 'Complete path from math foundations to Deep Learning and MLOps.',
        icon: 'machine-learning', 
        order: 20 // Late advanced topic
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
    for (const [categoryKey, categoryContent] of Object.entries(mlData)) {
      const categoryName = formatName(categoryKey);
      // Ensure specific study order in name if needed
      const categorySlug = await generateUniqueSlug(Category, categoryKey.toLowerCase().replace(/_/g, '-'));
      
      const group = categoryName; // Bypass AI grouping for deterministic matching
      
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
                    description: `Deep dive into ${sectionTitle} for Machine Learning.`,
                    content: `Content for ${sectionTitle}`, // In real app, this would be rich content
                    order: sectionOrder++,
                    isCompleted: false
                });
              }
          }
      }
      console.log(`  - Added sections from sub-groups`);
    }



    // --- PathMap Generation ---
    console.log('Generating PathMaps for Experience Levels...');

    const allCategories = await Category.find({ topicId: topic._id });
    const categoriesByGroup = {};
    allCategories.forEach(c => {
        if (!categoriesByGroup[c.group]) categoriesByGroup[c.group] = [];
        categoriesByGroup[c.group].push(c.slug);
    });

    const levels = {
        '0-1_year': [
            'Math Foundations', 'Data Handling', 'Supervised Learning'
        ],
        '1-3_years': [
            'Math Foundations', 'Data Handling', 'Supervised Learning',
            'Unsupervised Learning', 'Deep Learning Fundamentals', 'Natural Language Processing'
        ],
        '3-5_years': [
            'Math Foundations', 'Data Handling', 'Supervised Learning',
            'Unsupervised Learning', 'Deep Learning Fundamentals', 'Natural Language Processing',
            'Advanced Architectures', 'MLOps Deployment', 'Reinforcement Learning'
        ]
    };

    for (const [level, groups] of Object.entries(levels)) {
        let visibleSlugs = [];
        groups.forEach(g => {
            // Use rigorous matching: check if database group name INCLUDES our config name OR config name INCLUDES db group name
            const matchGroup = Object.keys(categoriesByGroup).find(dbGroup => 
                dbGroup.toLowerCase().includes(g.toLowerCase()) || g.toLowerCase().includes(dbGroup.toLowerCase())
            );
            
            if (matchGroup && categoriesByGroup[matchGroup]) {
                visibleSlugs = [...visibleSlugs, ...categoriesByGroup[matchGroup]];
            }
        });

        await PathMap.findOneAndUpdate(
            { topicId: topic._id, experienceLevel: level },
            { 
                topicId: topic._id,
                experienceLevel: level,
                visibleCategorySlugs: visibleSlugs 
            },
            { upsert: true, new: true }
        );
        console.log(`Created PathMap for ${level}: ${visibleSlugs.length} categories`);
    }

    console.log('✅ Machine Learning seeding complete!');
    
  } catch (error) {
    console.error('Error seeding Machine Learning:', error);
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
