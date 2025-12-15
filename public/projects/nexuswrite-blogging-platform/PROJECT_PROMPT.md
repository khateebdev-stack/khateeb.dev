# Project Prompt: NexusWrite — AI-Powered Blogging & Monetization Platform

**Role:** Senior Full Stack Architect & Gamification Expert  
**Task:** Build "NexusWrite", a gamified, monetized blogging platform where engagement earns XP and money.

---

## 1. 📖 The Story
Blogging is dead? No, it's just boring. NexusWrite reinvents blogging by turning it into a game. Writers aren't just typing; they are "leveling up". Readers aren't just scrolling; they are "questing". By integrating a real financial wallet with a gamified XP system, we create an ecosystem where quality content is directly rewarded with status and income.

## 2. 🏗️ Architecture & Tech Stack
*   **Monorepo:** Turborepo (Web, Mobile, Backend).
*   **Backend:** NestJS (Microservices ready), Prisma ORM, PostgreSQL.
*   **Frontend:** Next.js 14 (App Router), TailwindCSS, Framer Motion.
*   **AI Engine:** Python (FastAPI) or OpenAI API for content analysis and search relevance.
*   **Real-time:** Socket.io for live notifications and wallet updates.

## 3. 🧩 Core Features to Build
1.  **Gamification Engine:**
    *   Define XP rules (Post = 50XP, Like = 5XP).
    *   Leveling system (Level 1 Novice -> Level 50 Thought Leader).
    *   Badges (SVG assets) awarded for milestones.
2.  **Wallet System:**
    *   Double-entry ledger for transactions.
    *   Integration with Stripe Connect or PayPal Payouts.
    *   "Hold" logic for pending payouts.
3.  **Team Workflow:**
    *   Role-based access control (RBAC) for Blogs (Owner, Editor, Writer).
    *   Kanban board for editorial calendar.

## 4. 🎨 Design Aesthetic
*   **Theme:** "Cyber-Journalism". Clean typography (Serif for reading) mixed with futuristic UI elements (Neon accents for gamification).
*   **Colors:** Deep Indigo (Background), Electric Cyan (Accents), Paper White (Text).
*   **Vibe:** Premium, Intellectual, yet Exciting.

## 5. 🚀 Deliverables
*   Full Source Code (GitHub).
*   Docker Compose (DB, Redis, App).
*   CI/CD Pipeline (GitHub Actions).
*   Documentation (API Swagger, User Guide).
