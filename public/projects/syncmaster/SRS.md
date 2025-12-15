# Software Requirements Specification (SRS)
## Project Name: SyncMaster - Universal Sync Ecosystem

---

## 1. Executive Summary
**SyncMaster** is a cross-platform ecosystem (Android, iOS, Windows, Mac) that bridges the gap between your phone and your computer. It creates a seamless link, allowing real-time notification mirroring, instant file transfer (without cloud compression), and unified clipboard access. It solves the frustration of "Emailing photos to yourself" or missing calls while wearing headphones.

**Target Audience:** Power Users, Content Creators, Office Workers.
**Core Value:** "Your Phone and Laptop, acting as one device."

---

## 2. User Personas & Stories

### **Persona A: The Content Creator**
*   **Problem:** Shoots video on iPhone, needs to edit on Windows PC. Airdrop doesn't work. Google Photos is slow/compressed.
*   **Goal:** Instant, full-quality transfer of 4K video files.
*   **User Story:** "As a creator, I want to select 10 videos on my phone and have them appear in a folder on my PC instantly via local Wi-Fi."

### **Persona B: The Office Worker**
*   **Problem:** Misses urgent calls/texts because phone is on silent mode.
*   **Goal:** See and reply to notifications from the desktop.
*   **User Story:** "As an employee, I want to type SMS replies on my mechanical keyboard without picking up my phone."

---

## 3. Functional Requirements

### **3.1. File Sync (The "AirDrop" Killer)**
*   **FR-01:** **Local Wi-Fi Transfer:** Uses WebRTC/LAN to transfer files at max router speed (1Gbps+). No internet data used.
*   **FR-02:** **Gallery Mirror:** View phone photos on Desktop thumbnail grid. Drag-and-drop to copy to PC.
*   **FR-03:** **Smart Backup:** "New File Detection" - Automatically backs up *only* new camera roll items when connected.

### **3.2. Communications Bridge**
*   **FR-04:** **Notification Mirroring:** Intercepts Android/iOS notifications and displays them as Windows Toasts / Mac Notifications.
*   **FR-05:** **Universal Clipboard:** Copy text on Phone -> Paste on PC (and vice-versa).
*   **FR-06:** **Call Logs & SMS:** Read and Initiate calls/texts (via phone relay) from the desktop app.

### **3.3. Contact Sync**
*   **FR-07:** **Unified Contacts:** View phone contacts on PC. Add/Edit on PC -> Updates on Phone.

---

## 4. Technical Architecture

### **Mobile App (React Native)**
*   **Framework:** React Native (New Architecture).
*   **Permissions:** Request "Notification Listener", "File Access", "Contacts".
*   **Server:** Runs a lightweight HTTP server on the phone (`react-native-http-bridge`) to serve files to local PC.

### **Desktop Client (Electron or Tauri)**
*   **Framework:** Electron (for rich UI) or Tauri (for performance).
*   **Network:** Uses UDP Discovery to find the phone on the same Wi-Fi.
*   **Storage:** Local file system access.

### **Security**
*   **FR-08:** **End-to-End Encryption:** All transfers encrypted with TLS 1.3 even on local LAN.
*   **FR-09:** **Pairing:** QR Code handshake to establish trust.

---

## 5. Implementation Process

### **Phase 1: The Handshake (Days 1-5)**
1.  Implement UDP Broadcast discovery services on Mobile & Desktop.
2.  Build the QR Code pairing logic (exchange Auth Keys).

### **Phase 2: The Data Pipe (Days 6-12)**
1.  Build the File Transfer engine using WebRTC.
2.  Implement the "Gallery Grid" on Desktop (fetching thumbnails from Phone API).

### **Phase 3: The Notification Bridge (Days 13-18)**
1.  Write Native Modules (Kotlin/Swift) to listen to notifications.
2.  Send data via WebSocket to Desktop.

---

## 6. AI Prompts (For Development)

### **A. System Prompt for WebRTC Transfer**
> "Act as a Network Engineer. I need to transfer large files (video) from a React Native app to an Electron app over local Wi-Fi. Write the architecture. Use `react-native-webrtc`. key requirement: How do we handle 'resume' if the Wi-Fi drops?"

### **B. Prompt for Android Notification Listener**
> "Write a Kotlin Service for Android that listens to all notifications. It needs to extract: `Title`, `Body`, `App Icon`, and `Actions` (e.g., 'Reply'). Format this as a JSON object to send to the JS layer."

---

## 7. Visual Assets Prompts

### **A. Thumbnail (Marketing)**
> "A visual representation of seamless sync. **Left:** A Smartphone. **Right:** A Laptop. **Middle:** A glowing bridge/highway of data files, photos, and icons flowing between them. **Text:** 'UNIFIED ECOSYSTEM'. Clean, Apple-style advertising."

### **B. UI Mockup (Desktop Dashboard)**
> "A desktop dashboard UI. **Sidebar:** 'My iPhone 14', 'Photos', 'Files', 'Messages'. **Main Area:** A grid of recent photos from the phone. **Toast Notification:** A small popup in the corner 'Incoming Call: Mom - [Answer] [Decline]'. Dark mode."
