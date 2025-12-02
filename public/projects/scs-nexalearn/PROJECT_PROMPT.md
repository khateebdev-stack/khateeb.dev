# Master AI Prompt: SCS NexaLearn (Edu NexaLearn)

**Role:** You are a Principal Cloud Architect and EdTech Specialist.
**Objective:** Build/Simulate "SCS NexaLearn", a Multi-Tenant SaaS LMS designed for franchising education businesses.

---

## 📖 The Story (Context)
"The client, SCS Skills Institute, was a successful local training center. They wanted to expand globally by franchising their brand. However, their existing system was a mess of WhatsApp groups, manual Excel sheets, and a static website that crashed whenever they ran ads.
They needed a way to give *each* franchise partner their own branded academy (e.g., `london.scs.com`, `dubai.scs.com`) without building 100 separate websites. They also needed to automate the thousands of manual tasks (invoicing, class links) that were drowning their staff."

---

## 🔴 The Problem Analysis
1.  **The "Franchise" Dilemma:** How do you run 100+ academies on one codebase while keeping their data (students, payments) completely isolated?
2.  **The "WhatsApp" Dependency:** The business ran on WhatsApp. If an admin got sick, no one got class links. This had to be automated.
3.  **Scale:** During launch events, traffic spikes to 1M+ requests. A standard LAMP stack would crash.
4.  **Revenue Model:** The client wanted to earn from *service fees* (a % of franchise revenue) rather than interest-based loans, requiring a complex split-payment system.

---

## ✅ The Solution: NexaLearn SaaS
**Concept:** A Multi-Tenant "LMS Factory".
**Core Features to Build:**
1.  **Multi-Tenancy Engine:** A middleware that detects the subdomain (`london.scs.com`) and routes the request to the correct Tenant ID in the database (`WHERE tenant_id = 'london'`).
2.  **WhatsApp Automation:** A bot that listens to webhooks. When a class is scheduled, it automatically sends the Zoom link to the student's WhatsApp.
3.  **Microservices Architecture:** Decouple the "Heavy" parts (Video Processing, Analytics) from the "Core" parts (Auth, Payments) to ensure 99.99% uptime.

---

## 🛠️ Technical Specifications for AI Generation
*   **Architecture:** Microservices running on Kubernetes (K8s).
*   **Database:** PostgreSQL with Row-Level Security (RLS) for tenant isolation.
*   **Frontend:** Next.js 14. Use `Middleware` for subdomain routing.
*   **DevOps:** Use Docker Compose for local dev, Helm Charts for production.
*   **Integration:** Twilio/Meta API for WhatsApp.

---

## 🎨 Design Aesthetic (Prompt for UI)
"Create a UI that is **White-Label Ready**. The base design should be clean and neutral (Greyscale), but allow a 'Theme Config' to inject the Franchise's Primary Color and Logo instantly. The Dashboard should look like a high-end SaaS (think Salesforce or HubSpot) but simplified for educators."

---

## 🚀 Key Deliverables
1.  **Super Admin Dashboard:** A map view of all active franchises and their revenue.
2.  **Franchise Wizard:** A step-by-step form to "Spawn" a new academy in 30 seconds.
3.  **Student Portal:** A gamified learning interface with "Streaks" and "Badges".
