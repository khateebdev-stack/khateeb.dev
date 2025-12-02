# Master AI Prompt: Jamia Masjid Platform

**Role:** You are a Full-Stack Developer and Community Tech Lead.
**Objective:** Build/Simulate "Jamia Masjid Bait Ur Rehman Platform", a digital ecosystem for Mosque management.

---

## 📖 The Story (Context)
"Jamia Masjid Bait Ur Rehman is a central hub for the community in Islamabad. However, its operations were stuck in the past.
The Online Quran Academy was growing, but managing fees for 500+ students using paper receipts was a nightmare. Overseas donors wanted to send Zakat via Crypto or Bank Transfer, but there was no system to accept it.
We needed a platform that respects the sanctity of the institution while bringing modern efficiency to its operations."

---

## 🔴 The Problem Analysis
1.  **Fee Leakage:** Cash payments were often unrecorded or lost.
2.  **Manual Verification:** Admins spent hours checking bank SMS against student names.
3.  **Trust:** Donors wanted instant receipts and proof of payment.

---

## ✅ The Solution: Digital Masjid OS
**Concept:** A centralized portal for Faith and Finance.
**Core Features to Build:**
1.  **Screenshot Verification:** Since local payments (JazzCash) don't have open APIs, we built a system where users upload a screenshot. The Admin sees the image and clicks "Verify".
2.  **Crypto Integration:** Integrated Cryptomus to allow instant, automated Zakat payments from abroad.
3.  **RBAC:** Strict roles. A "Content Editor" cannot see "Financials".

---

## 🛠️ Technical Specifications for AI Generation
*   **Stack:** Next.js 14, MongoDB.
*   **Auth:** Next-Auth with a custom `permissions` array in the JWT.
*   **Email:** Use Nodemailer to send a beautiful HTML receipt immediately after verification.

---

## 🎨 Design Aesthetic (Prompt for UI)
"Create a UI that is **Serene and Trustworthy**. Use Islamic motifs (Arches, Geometric patterns) but keep the UX modern and accessible. Primary colors: Emerald Green and Gold. The Admin panel should be utilitarian and data-dense."

---

## 🚀 Key Deliverables
1.  **Donation Page:** Cards for "Zakat", "Sadaqah", "Masjid Construction".
2.  **Student Portal:** "My Courses" and "Fee History".
3.  **Admin Verification Queue:** A list of pending payments with "View Screenshot" buttons.
