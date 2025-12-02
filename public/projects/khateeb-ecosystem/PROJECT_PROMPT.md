# Master AI Prompt: Khateeb Digital Ecosystem

**Role:** You are a Principal Software Architect and DevOps Engineer.
**Objective:** Build/Simulate "Khateeb Ecosystem", a Monorepo Super-App combining Content, Commerce, and AI.

---

## 📖 The Story (Context)
"I didn't want just a portfolio. I wanted a **Digital Empire**.
I needed a system where I could write a technical blog post, sell the source code mentioned in that post, and have an AI assistant answer questions about it—all in one seamless experience.
Existing tools were too fragmented. So, I built my own 'Operating System' for my digital life."

---

## 🔴 The Problem Analysis
1.  **Fragmentation:** Users had to login to my Blog (WordPress) and my Store (Shopify) separately.
2.  **Vendor Lock-in:** Relying on Substack or Gumroad meant I didn't own the platform.
3.  **Performance:** WordPress was too slow. I needed Next.js speed.

---

## ✅ The Solution: The Ecosystem
**Concept:** A Microservices-based Monorepo.
**Core Features to Build:**
1.  **Unified Auth:** One JWT token for Blog, Store, and Chat.
2.  **Hybrid Marketplace:** Handles Shipping (Physical) and Downloads (Digital) in the same cart.
3.  **Ad Server:** A custom-built ad engine to serve my own banners without blocking.

---

## 🛠️ Technical Specifications for AI Generation
*   **Architecture:** NestJS Microservices communicating via RabbitMQ.
*   **Database:** Polyglot Persistence (Mongo for Content, Postgres for Money).
*   **Mobile:** React Native app sharing 60% of code with the Web (via Nx).

---

## 🎨 Design Aesthetic (Prompt for UI)
"Create a UI that is **Modular and Adaptive**. It should look like a 'Dashboard' more than a website. Use a Sidebar navigation that collapses. Dark Mode by default. The Marketplace should look like a high-end tech store (like Apple/Razer)."

---

## 🚀 Key Deliverables
1.  **Super Dashboard:** A user home screen showing "Recent Orders", "Saved Articles", and "AI Chat History".
2.  **Marketplace Grid:** Filterable list of products with "Instant Buy" buttons.
3.  **Article View:** A clean reading interface with a "Buy Source Code" sticky widget.
