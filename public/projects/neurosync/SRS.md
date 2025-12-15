# Software Requirements Specification (SRS)
## Project Name: NeuroSync - The Context-Aware AI Operating System

---

## 1. Executive Summary
**NeuroSync** is a "Local-First" AI ecosystem that runs across Desktop (Windows/Mac/Linux), Mobile (iOS/Android), and Web. Unlike cloud-based AI (ChatGPT) or siloed tools (Rewind.ai), NeuroSync creates a **Unified Context Graph** of your entire digital life without sending a single byte of private data to the cloud. It solves the "Fragmented Workflow" crisis by allowing users to search, control, and automate their digital environment using natural language.

**Target Audience:** Power Users, Developers, Founders, Executives.
**Core Value:** "Your Second Brain. Local, Private, and Everywhere."

---

## 2. User Personas & Stories

### **Persona A: David (The Overflowing Founder)**
*   **Problem:** Uses 20+ apps (Slack, WhatsApp, Jira, Email). Forgets where he saw critical info.
*   **Goal:** Instant recall of any information seen on his screen in the past 30 days.
*   **User Story:** "As a founder, I want to type 'Show me the invoice John sent last week' and have the system find it, whether it was in a PDF, an Email, or a Zoom screen share."

### **Persona B: Sarah (The Deep-Work Developer)**
*   **Problem:** Constant interruptions from phones and Slack destroy her flow state.
*   **Goal:** An intelligent "Gatekeeper" that only lets truly urgent interruptions through.
*   **User Story:** "As a developer, I want my phone to automatically silence itself when I am coding in VS Code, but ring loudly if the server crashes or my wife calls."

---

## 3. Functional Requirements

### **3.1. Desktop Application (The Brain)**
*   **FR-01:** **Screen Recording & OCR:** Continuously record screen activity (compressed locally) and perform OCR to make everything searchable.
*   **FR-02:** **Process Monitoring:** Detect which app is active (e.g., VS Code vs. YouTube) to calculate "Productivity Score".
*   **FR-03:** **Local Vector DB:** Embed all text (OCR, Keylogs, Pasteboard) into a local ChromaDB instance.
*   **FR-04:** **Cross-Device Sync:** Sync the "Index" (not the heavy video) to Mobile via P2P (Peer-to-Peer) encryption.

### **3.2. Mobile Application (The Remote)**
*   **FR-05:** **Notification Intercept:** Intercept all Android/iOS notifications.
*   **FR-06:** **AI Triage:** A lightweight Local LLM (Phi-3) runs on the phone to analyze notifications.
    *   *If 'Urgent' -> Ring.*
    *   *If 'Spam' -> Silently summarize.*
*   **FR-07:** **Voice Capture:** High-fidelity voice recorder that syncs to Desktop for transcription and summarization.

### **3.3. Web Dashboard (The Analytics)**
*   **FR-08:** **Flow State Visualization:** Heatmaps showing "Deep Work" vs "Distraction" times.
*   **FR-09:** **Team Insights (Anonymized):** For teams, aggregate data to show "Burnout Risk" without exposing private screen data.

---

## 4. Technical Architecture (The "Impossible" Stack)

### **Desktop (Tauri + Rust + React)**
*   **Framework:** Tauri (v2). Rust for system-level hooks (Keylogger, Screen Recorder). React for UI.
*   **AI:** Llama-3 (8B) quantized running on OnnxRuntime (GPU accelerated).
*   **Database:** GlueSQL (local SQL) + ChromaDB (Vectors).

### **Mobile (React Native + Turbo Modules)**
*   **Framework:** React Native (New Architecture).
*   **Native Modules:** Swift/Kotlin modules for Notification Listening and Background Services.
*   **Sync:** Syncthing Protocol (P2P syncing over LAN/WebRTC).

### **Backend (Minimal Signaling Server)**
*   **Purpose:** Only for "Handshake" (WebRTC signaling). No user data is stored here.
*   **Tech:** Go (Golang) + Redis.

---

## 5. Implementation Process

### **Phase 1: The "Recorder" (Desktop Core)**
1.  Build Rust system hooks for Screen Capture (DXGI on Windows, ScreenCaptureKit on Mac).
2.  Implement Tesseract OCR pipeline (Rust bindings).
3.  Set up ChromaDB locally.

### **Phase 2: The "Brain" (Local LLM)**
1.  Integrate `llm.rs` or `onnxruntime` to run Llama-3 locally.
2.  Build the "Chat with Context" UI (RAG pipeline).

### **Phase 3: The "Link" (Mobile Sync)**
1.  Build the React Native app.
2.  Implement QR Code pairing (Exchange P2P keys).
3.  Create the Notification Listener (Kotlin/Swift).

---

## 6. AI Prompts (For Development)

### **A. System Prompt for Rust Architecture**
> "Act as a Systems Engineer. I am building a Tauri app that needs to record the screen 24/7 with low CPU usage. Design a Rust module using `windows-capture` crate. It should capture frames at 1fps, diff them to check for changes, and if changed, run OCR. Explain how to manage memory to prevent leaks."

### **B. Prompt for Local RAG Pipeline**
> "I have a local ChromaDB instance with millions of vectors from OCR data. Write a Python (or Rust) algorithm to perform a 'Hybrid Search' (Keyword + Vector). If the user searches for 'Invoice from John', how do I weight the keyword 'Invoice' higher than the semantic meaning?"

---

## 7. Visual Assets Prompts

### **A. Thumbnail (Marketing)**
> **Prompt:** "A futuristic concept art. **Center:** A glowing 'digital brain' connected to a Laptop, Phone, and Smartwatch. **Background:** A matrix of floating documents/images being organized by invisible hands. **Text:** 'YOUR SECOND BRAIN'. Dark, Cyberpunk, Neon Blue aesthetic."

### **B. UI Mockup (Timeline View)**
> **Prompt:** "A UI design for a 'Rewind' timeline. **Bottom:** A scrubber bar timeline (like a video editor) representing the whole day. **Thumbnails:** Small screenshots appear as you hover. **Overlay:** '10:00 AM - Coding (VS Code)', '10:45 AM - Meeting (Zoom)'. **Search:** A floating search bar 'Ask anything...'. Glassmorphism style."
