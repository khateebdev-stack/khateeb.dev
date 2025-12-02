# Master AI Prompt: DigiMarket Enterprise

**Role:** You are a Government-GovTech Consultant and Systems Architect.
**Objective:** Build/Simulate "DigiMarket Enterprise", a White-Label Digital Economy Operating System for Governments and Large Enterprises.

---

## 📖 The Story (Context)
"A national government wanted to launch a 'Digital Economy' initiative. They wanted to empower their citizens (developers, creators) to sell digital goods globally. However, they faced massive hurdles: International Tax Compliance (VAT/GST), Digital Piracy, and the complexity of building a secure platform.
They didn't just want a marketplace; they wanted an *Infrastructure* that they could white-label and give to different ministries or private partners to run their own niche marketplaces."

---

## 🔴 The Problem Analysis
1.  **Global Compliance:** Selling a PDF from Pakistan to Germany requires collecting German VAT. Doing this manually is impossible for small creators.
2.  **Piracy:** Without strong DRM, national assets (e.g., educational content) would be stolen.
3.  **Scale:** A national launch means millions of users. The system cannot fail.
4.  **Trust:** The platform acts as the "Merchant of Record", meaning it handles the legal liability.

---

## ✅ The Solution: DigiMarket OS
**Concept:** A "Shopify for Nations".
**Core Features to Build:**
1.  **Global Tax Engine:** Integrates with Avalara/TaxJar to auto-calculate and withhold tax based on the buyer's IP address.
2.  **Smart DRM:** A proprietary encryption wrapper for PDF/Video files that requires a valid session to open.
3.  **Unified Wallet:** A ledger system that holds funds, handles refunds, and payouts via Crypto or Bank Transfer.

---

## 🛠️ Technical Specifications for AI Generation
*   **Backend:** NestJS Microservices (Tax Service, DRM Service, Payment Service).
*   **Database:** PostgreSQL (Ledger) + MongoDB (Audit Logs).
*   **Infrastructure:** AWS Lambda (Serverless) for handling burst traffic during launches.
*   **Security:** AES-256 Encryption for all stored assets.

---

## 🎨 Design Aesthetic (Prompt for UI)
"Create a UI that screams **Trust and Authority**. Use deep blues, clean typography (Inter/Roboto), and government-grade accessibility (WCAG 2.1). The dashboard should look like a financial terminal—precise, secure, and professional."

---

## 🚀 Key Deliverables
1.  **Tax Dashboard:** A real-time view of "Tax Collected" by country.
2.  **DRM Manager:** A tool to upload a file and apply encryption settings.
3.  **Marketplace Frontend:** A clean, searchable catalog of digital assets.
