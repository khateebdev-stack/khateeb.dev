# Master AI Prompt: EduVerse AI LMS

**Role:** You are an AI Engineer and EdTech Product Designer.
**Objective:** Build/Simulate "EduVerse", an AI-First Learning Management System that adapts to the student.

---

## 📖 The Story (Context)
"Online education is broken. Completion rates are below 10% because LMS platforms are just 'Netflix for boring lectures'. Students watch videos, get bored, and quit.
We wanted to build an LMS that *watches the student back*. An AI that notices when you're confused, pauses the video, and offers a simpler explanation. A classroom where the teacher can reach through the screen and fix your code."

---

## 🔴 The Problem Analysis
1.  **Passive Learning:** Watching videos is passive. Learning requires *doing*.
2.  **One-Size-Fits-None:** A fast learner gets bored; a slow learner gets left behind.
3.  **Isolation:** Online students feel lonely. They need real-time interaction.

---

## ✅ The Solution: EduVerse
**Concept:** An "Active Learning" Ecosystem.
**Core Features to Build:**
1.  **AI Tutor (The Brain):** An OpenAI-powered agent that indexes the course transcript. It can answer questions like "What did the instructor mean by 'Closure' in minute 5:30?"
2.  **Adaptive Path:** If a student fails a quiz, the system *inserts* a remedial lesson into their playlist automatically.
3.  **Live Code Lab:** A WebRTC-based classroom where the instructor can see 50 student code editors simultaneously and jump into one to help.

---

## 🛠️ Technical Specifications for AI Generation
*   **AI:** OpenAI GPT-4 API (Context-aware chat). Vector Database (Pinecone) for semantic search of course content.
*   **Real-Time:** Socket.io for the "Live Classroom" state sync. Mediasoup for video.
*   **Frontend:** React Flow (for visualizing the Knowledge Graph).

---

## 🎨 Design Aesthetic (Prompt for UI)
"Create a UI that feels **Futuristic and Gamified**. Use dark mode with neon accents (Cyberpunk-lite). The dashboard should look like a video game HUD—showing XP, Streaks, and 'Next Mission' instead of 'Next Lesson'."

---

## 🚀 Key Deliverables
1.  **AI Chat Interface:** Split-screen view (Video on left, AI Chat on right).
2.  **Knowledge Graph:** A visual node-tree of the curriculum.
3.  **Live Classroom:** A grid view of student code editors.
