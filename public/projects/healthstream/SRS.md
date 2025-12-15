# Software Requirements Specification (SRS)
## Project Name: HealthStream - HIPAA Compliant Telemedicine Platform

---

## 1. Executive Summary
**HealthStream** is a secure, HIPAA-compliant telemedicine platform that allows doctors to conduct encrypted video consultations with patients. It solves the problem of "Insecure Zoom Calls" by providing a dedicated medical environment with integrated Electronic Health Records (EHR), prescription management, and appointment scheduling.

**Target Audience:** Private Clinics, Therapists, Dermatologists.
**Core Value:** "Secure, Encrypted, and Easy-to-Use Virtual Clinic."

---

## 2. User Personas & Stories

### **Persona A: Dr. Emily (Dermatologist)**
*   **Problem:** Uses WhatsApp for patient follow-ups, which is illegal (non-HIPAA). Needs a professional tool.
*   **Goal:** See patients remotely, take notes during the call, and send prescriptions instantly.
*   **User Story:** "As a doctor, I want to join a video call with one click and see the patient's history on the side of the screen."

### **Persona B: Mark (Patient)**
*   **Problem:** Hates driving 45 mins for a 5-min checkup.
*   **Goal:** Book an appointment online and see the doctor from his phone.
*   **User Story:** "As a patient, I want to book a slot, pay online, and get a link to join the video call without downloading an app."

---

## 3. Functional Requirements

### **3.1. Authentication & Roles**
*   **FR-01:** **Doctor Login:** 2FA (Two-Factor Authentication) is mandatory for doctors.
*   **FR-02:** **Patient Portal:** Patients login via magic link (passwordless) for ease of use.
*   **FR-03:** **Role-Based Access:** Doctors can see all records; Patients can only see their own.

### **3.2. Video Consultation (The Core)**
*   **FR-04:** **HD Video:** Peer-to-Peer WebRTC video calls (using LiveKit or Twilio).
*   **FR-05:** **End-to-End Encryption:** Video streams must be encrypted. No recording stored on server unless requested.
*   **FR-06:** **Screen Sharing:** Doctors can share screen to show X-rays or results.

### **3.3. Appointment Management**
*   **FR-07:** **Calendar:** Doctors set availability. Patients book slots.
*   **FR-08:** **Payments:** Stripe integration to charge patients before the call.
*   **FR-09:** **Reminders:** SMS/Email reminders 1 hour before the appointment.

### **3.4. Electronic Health Records (EHR)**
*   **FR-10:** **Live Notes:** Doctor can type notes *during* the video call in a sidebar.
*   **FR-11:** **Prescriptions:** Doctor can generate a PDF prescription and sign it digitally.
*   **FR-12:** **File Upload:** Patient can upload photos (e.g., skin rash) before the call.

---

## 4. Technical Architecture

### **Frontend (Next.js 14)**
*   **Framework:** Next.js App Router.
*   **Real-time:** Socket.io (for chat/notifications).
*   **Video:** LiveKit (WebRTC wrapper).
*   **UI:** Tailwind CSS + Radix UI.

### **Backend (Node.js)**
*   **API:** NestJS (for strict architecture) or Express.
*   **Database:** PostgreSQL (Supabase) with Row Level Security (RLS).
*   **Storage:** AWS S3 (Encrypted Buckets) for medical files.

### **Security (HIPAA)**
*   **Encryption:** AES-256 for database fields (names, diagnosis).
*   **Audit Logs:** Every view/edit of a patient record is logged.
*   **BAA:** Signed Business Associate Agreement with cloud providers.

---

## 5. Implementation Process

### **Phase 1: The "Clinic" (Days 1-5)**
1.  Setup Database schema (Doctors, Patients, Appointments).
2.  Build the Booking UI (Calendar).
3.  Integrate Stripe for payments.

### **Phase 2: The "Video" (Days 6-10)**
1.  Integrate LiveKit for video rooms.
2.  Build the "Waiting Room" UI for patients.
3.  Implement Screen Sharing and Mute/Unmute logic.

### **Phase 3: The "Records" (Days 11-14)**
1.  Build the Doctor's Dashboard (Patient List).
2.  Create the "Live Notes" sidebar component.
3.  Implement PDF generation for Prescriptions.

---

## 6. AI Prompts (For Development)

### **A. System Prompt for Architecture**
> "Act as a Senior Healthcare Architect. I am building a HIPAA-compliant telemedicine app using Next.js and Supabase. Design the Database Schema. I need tables for `Doctors`, `Patients`, `Appointments`, and `MedicalRecords`. Explain how to use Row Level Security (RLS) to ensure patients can NEVER see other patients' data."

### **B. Prompt for Video Component**
> "Create a React component called `VideoRoom`. It should use `livekit-client`. It needs a grid layout. If 2 people are in the call, show split screen. If 1 person, show them full screen. Add controls for 'Toggle Mic', 'Toggle Camera', and 'End Call'. Use Tailwind CSS for a clean, medical look."

---

## 7. Visual Assets Prompts

### **A. Thumbnail (Marketing)**
> **Prompt:** "A split screen composition. **Left:** A friendly doctor smiling at a webcam, wearing a stethoscope. **Right:** A patient looking happy on a tablet screen. **Overlay:** A shield icon representing 'Secure'. **Text:** 'TELEMEDICINE PLATFORM'. Clean, white and teal medical color scheme."

### **B. UI Mockup (Video Call)**
> **Prompt:** "A high-fidelity UI of a video call interface. **Main Screen:** The doctor's face. **Sidebar:** A panel showing 'Patient History' and 'Prescription Pad'. **Controls:** sleek round buttons at the bottom for Mute/Video. **Style:** Very clean, white, sterile but modern."
