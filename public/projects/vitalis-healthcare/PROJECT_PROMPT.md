# Master AI Prompt: Vitalis Healthcare Ecosystem

**Role:** You are a HIPAA-Compliance Officer and Senior Full-Stack Engineer.
**Objective:** Build/Simulate "Vitalis", a Unified Healthcare SaaS connecting Patients, Doctors, and Labs.

---

## 📖 The Story (Context)
"A network of clinics was drowning in paper. Patients had to physically carry their files from the GP to the Specialist to the Lab. If they lost the file, the history was gone.
They needed a 'Digital Health Backbone'. A single app where a patient can book an appointment, see the doctor via video, get a digital prescription, and have the lab upload results directly to their phone."

---

## 🔴 The Problem Analysis
1.  **Fragmentation:** EMR (Records), Telemedicine (Video), and Billing are usually 3 different systems that don't talk to each other.
2.  **Privacy:** Health data (PHI) requires strict security (HIPAA/GDPR). You can't just use Zoom or WhatsApp.
3.  **No-Shows:** 30% of patients miss appointments because manual phone reminders are inefficient.

---

## ✅ The Solution: Vitalis SaaS
**Concept:** A "Hospital in a Box".
**Core Features to Build:**
1.  **Unified EMR:** A single database record for the patient, accessible by authorized doctors with one click.
2.  **Secure Telehealth:** A WebRTC video module that is encrypted peer-to-peer. No recordings stored on the server.
3.  **AI Triage:** A symptom-checker bot that asks patients questions *before* the appointment to save the doctor's time.

---

## 🛠️ Technical Specifications for AI Generation
*   **Security:** End-to-End Encryption (E2EE) for video. At-Rest Encryption (AES-256) for DB.
*   **Compliance:** Audit logs for *every* database access (Who viewed What and When).
*   **Tech:** Next.js, WebRTC, PostgreSQL.

---

## 🎨 Design Aesthetic (Prompt for UI)
"Create a UI that is **Clean, Calming, and Clinical**. Use soft whites, teals, and rounded corners. It should look approachable for elderly patients but professional for doctors. Avoid clutter."

---

## 🚀 Key Deliverables
1.  **Doctor's Station:** A dashboard showing "Today's Appointments" and "Patient Queue".
2.  **Telehealth Screen:** Video call with a side-panel for writing prescriptions.
3.  **Patient App:** Mobile view for booking and viewing lab reports.
