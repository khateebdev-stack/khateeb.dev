# SRS: Jamia Masjid Bait Ur Rehman Platform

**Version:** 1.0  
**Category:** Non-Profit / EdTech / FinTech  
**Client:** Jamia Masjid Bait Ur Rehman (Islamabad)  
**Target Audience:** Community Members, Students, Donors

---

## 1. 📝 Executive Summary

**Jamia Masjid Platform** is a comprehensive digital ecosystem for a modern mosque. It centralizes three core pillars: **Community Presence** (Events/Announcements), **Online Academy** (Student Intake/Billing), and **Donations** (Zakat/Sadaqah). It replaces manual paper registers and cash handling with a secure, RBAC-controlled digital system that handles multi-channel payments (Crypto, Bank, Mobile Wallets).

**Unique Value Proposition (UVP):** "Digitizing the House of Allah: A unified platform for Worship, Education, and Charity."

---

## 2. 🎯 Problem vs. Solution

### 🔴 The Challenge
**Context:** The Masjid was operating manually.
*   **Academy:** Fee collection was cash-based, leading to tracking errors and "lost" payments.
*   **Donations:** No easy way for overseas Pakistanis to donate (Crypto/International Cards).
*   **Admin:** Managing 500+ students and thousands of donors on Excel was unsustainable.

### ✅ The Solution
**Logic:** A Full-Stack Next.js Platform.
1.  **Automated Billing:** Monthly invoices generated automatically for all active students.
2.  **Hybrid Payments:** Accepts JazzCash (Manual Screenshot Upload) and Crypto (Cryptomus Integration).
3.  **Granular RBAC:** "Finance Manager" can verify payments, but "Teacher" can only view student progress.

---

## 3. 🛠️ Technical Architecture

### Tech Stack
*   **Frontend:** Next.js 14 (App Router), TailwindCSS, Lucide Icons.
*   **Backend:** Next.js API Routes (Serverless Functions).
*   **Database:** MongoDB (Mongoose) for flexible schema (Students, Invoices, Events).
*   **Auth:** Next-Auth (Session Management) with Custom RBAC Middleware.
*   **Payments:** Cryptomus (Crypto), Manual Bank Transfer (Screenshot Verification).
*   **Media:** Cloudinary (Payment Screenshots).
*   **Email:** Nodemailer (Transactional SMTP).

---

## 4. 📱 Key Modules

### 1. Online Academy Portal
*   **Admissions:** Online form with approval workflow (Pending -> Approved).
*   **Course Management:** CRUD for courses (Quran Nazra, Hifz, Tajweed).
*   **Fee Management:** Auto-generation of monthly invoices based on enrolled courses.

### 2. Donation & Payments Engine
*   **Multi-Channel:** Supports Bank Transfer, EasyPaisa, and Crypto (USDT/BTC).
*   **Verification:** Admin "Verify" modal to approve manual payment screenshots.
*   **Receipts:** Auto-generated digital receipts sent via email.

### 3. Admin Command Center
*   **Dashboard:** Stats for "Total Collection", "Pending Fees", "Active Students".
*   **RBAC:** Granular permissions (e.g., `can_approve_payments`, `can_edit_content`).
*   **Audit Logs:** Track who verified which payment.

---

## 5. 📊 Success Metrics
*   **Efficiency:** Fee collection time reduced by 80%.
*   **Transparency:** 100% of donations and fees are digitally tracked.
*   **Global Reach:** Enabled crypto donations from international donors.

---

## 6. 📅 Implementation Roadmap
*   **Phase 1:** Public Website & Content Management.
*   **Phase 2:** Academy Module & Student Registration.
*   **Phase 3:** Payment Integration (Cryptomus + Manual).
*   **Phase 4:** Admin Dashboard & RBAC Polish.
