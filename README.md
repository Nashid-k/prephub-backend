# 🧠 PrepHub Backend API

<div align="center">

### **The Intelligent Engine Powering PrepHub**

[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.x-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Gemini](https://img.shields.io/badge/AI-Gemini_Pro-8E75B2?style=for-the-badge&logo=google)](https://deepmind.google/technologies/gemini/)

</div>

---

## ⚡ Overview

The **PrepHub Backend** is not just a standard CRUD API. It is a sophisticated **AI Orchestration System** designed to deliver personalized education at scale. It manages user progress, orchestrates complex AI interactions, and ensures zero-downtime learning through intelligent fallback mechanisms.

---

## 🔥 Key Features

### 🤖 **AI Orchestration Mesh**
We built a resilient **3-Layer AI Fallback System** to ensure specific services never go offline:
1.  **Primary:** **Google Gemini 1.5 Pro** (High fidelity explanations)
2.  **Secondary:** **Groq Llama-3** (Ultra-fast fallback)
3.  **Tertiary:** **Hugging Face Mistral** (Emergency backup)

### 📈 **Adaptive Learning Engine**
The backend calculates a unique **"Relevance Score"** for every topic based on:
- **Recency:** Exponential decay functions track what you studied recently.
- **Engagement:** Time spent per session and practice frequency.
- **Mastery:** Quiz scores and code completion rates.
*Result: A dashboard that knows what you need to study before you do.*

### ⚡ **Hybrid Caching Layer**
To minimize AI costs and latency, we implement a dual-layer caching strategy:
- **L1 Memory Cache:** Instant retrieval for hot topics.
- **L2 Persistent Cache:** MongoDB-based storage for long-tail queries (TTL: 7 days).

### 🛡️ **Security & Architecture**
- **JWT Authentication:** Secure stateless sessions.
- **Role-Based Access Control (RBAC):** Admin vs User capabilities.
- **Rate Limiting:** Protects AI endpoints from abuse.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **AI Integration:** Google Generative AI SDK, Groq SDK, Hugging Face Inference
- **Authentication:** JSON Web Tokens (JWT) + Bcrypt
- **Validation:** Joi / Express Validator
- **Logging:** Morgan + Custom Loggers

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Instance (Local or Atlas)
- API Keys for Gemini, Groq (Optional for dev), Hugging Face

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/prephub-backend.git
    cd prephub-backend
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment**
    Create a `.env` file in the root directory:
    ```env
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/prephub
    JWT_SECRET=your_super_secret_key
    GEMINI_API_KEY=your_gemini_key
    GROQ_API_KEY=your_groq_key
    HUGGING_FACE_API_KEY=your_hf_key
    ```

4.  **Seed Database (Optional)**
    Populate initial roadmap data:
    ```bash
    npm run seed
    ```

5.  **Start Server**
    ```bash
    npm run dev
    ```

---

## 📂 Project Structure

```bash
src/
├── config/          # DB connection, AI clients, etc.
├── controllers/     # Application logic (AI, Auth, Curriculum)
├── models/          # Mongoose Schemas (User, Topic, Activity)
├── routes/          # Express Routes
├── services/        # Business logic (GeminiService, RankingService)
├── middleware/      # Auth checks, Error handling
└── utils/           # Helper functions
```

---

## 🤝 Contributing

We welcome backend wizards! If you want to optimize our ranking algorithms or add new AI providers:

1.  Fork the repo
2.  Create your branch (`git checkout -b feature/Optimization`)
3.  Commit changes (`git commit -m 'Optimize ranking algo'`)
4.  Push to branch (`git push origin feature/Optimization`)
5.  Open a PR

---

<div align="center">

**Built for Developers, by Developers.**

</div>
