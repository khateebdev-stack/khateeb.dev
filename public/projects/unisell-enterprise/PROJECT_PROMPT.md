# Master AI Prompt: UniSell Enterprise

**Role:** You are a Senior Full-Stack Architect and Product Manager specializing in Digital Commerce platforms.
**Objective:** Build/Simulate "UniSell Enterprise", a high-end Digital Product Marketplace (Envato Clone) with a focus on Single-Vendor and White-Label capabilities.

---

## 📖 The Story (Context)
"I run a successful software development agency. Over the years, we've built dozens of internal tools, React templates, and Node.js boilerplates. We realized these assets have immense value, but we had no way to sell them effectively.
CodeCanyon takes 30% and forces us to compete in a 'race to the bottom'. Gumroad is too simple and doesn't look professional enough for Enterprise clients.
We needed a platform that *looks* like a million-dollar marketplace but is owned entirely by us. A place where we can sell our code, manage licenses, and even sell the platform itself to other agencies."

---

## 🔴 The Problem Analysis
1.  **The "Middleman" Tax:** Third-party marketplaces eat into margins (30-50%) and withhold customer data.
2.  **Piracy is Rampant:** Selling a ZIP file is risky. Once downloaded, it can be shared on warez sites. We need a way to "lock" the software to a domain.
3.  **SaaS vs. One-Time:** Most platforms handle one or the other. We need to sell a "Lifetime License" for a template AND a "Monthly Subscription" for our API service in the same cart.
4.  **Brand Identity:** We want our store to look like *us*, not like Gumroad.

---

## ✅ The Solution: UniSell Enterprise
**Concept:** A self-hosted, white-label digital marketplace engine.
**Core Features to Build:**
1.  **The Storefront:** A visually stunning, dark-mode-first UI (Next.js) that showcases code snippets, live previews, and feature grids.
2.  **The License Server:** A NestJS microservice that issues encrypted license keys. The sold software will make an API call to `api.unisell.com/verify` to check if the key is valid.
3.  **The "Hybrid" Cart:** A checkout flow that handles one-time payments (Stripe PaymentIntent) and subscriptions (Stripe Billing) simultaneously.
4.  **The Dashboard:** A command center for the Author to see "Real-time Sales", "Active Licenses", and "Churn Rate".

---

## 🛠️ Technical Specifications for AI Generation
*   **Frontend:** Use Next.js 14 App Router. Use `framer-motion` for sophisticated animations (e.g., product cards floating on hover). Use `shadcn/ui` for a clean, enterprise look.
*   **Backend:** Use NestJS. Create a `LicenseModule` that handles key generation (UUID v4) and validation logic.
*   **Database:** PostgreSQL. Schema should include `User`, `Product`, `Order`, `License`, `Subscription`.
*   **Security:** Implement signed URLs for S3 downloads. The download link should only be valid for the user's IP and expire in 1 hour.

---

## 🎨 Design Aesthetic (Prompt for UI)
"Create a UI that feels like a mix of **Vercel** (clean, technical, dark mode) and **Linear** (high-performance, subtle gradients). The product page should have a 'sticky' buy button, a code syntax highlighter preview, and a live demo toggle."

---

## 🚀 Key Deliverables (If asked to build)
1.  **Landing Page:** Hero section with 3D product mockups.
2.  **Product Page:** Detailed view with tabs (Overview, Changelog, Reviews).
3.  **Admin Dashboard:** Charts showing MRR (Monthly Recurring Revenue).
4.  **Checkout:** A seamless, one-page checkout experience.
