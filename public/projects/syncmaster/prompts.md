# AI Prompts for SyncMaster Project

This file contains all the AI prompts you need to build, design, and market the **SyncMaster** project.

---

## 1. UI Design Prompts (Global Style & Layouts)

### **A. The "Fused Glass" Aesthetic (Apple/Windows Native)**
> **Prompt:** "A high-fidelity UI/UX design system for a cross-device sync app called 'SyncMaster'. **Color Palette:** Pure White, System Blue (#007AFF), and Slate Grey. **Typography:** San Francisco (Apple) or Segoe UI (Windows) - Native look. **Style:** Glassmorphism (blur backgrounds), thin borders, rounded corners. **Vibe:** 'It feels like part of the Operating System'. **Elements:** Native list items, skeleton loaders, transparent sidebars."

---

## 2. Thumbnail Prompts (High CTR)

1.  **The "Slow vs Fast" Hook:**
    > **Prompt:** "A split screen comparison. **Left:** A loading bar stuck at 10% labeled 'Cloud Sync'. **Right:** A lightning-fast blur labeled 'SyncMaster (LAN)'. **Text:** 'DON'T USE THE CLOUD'. High energy."

2.  **The "Productivity" Hook:**
    > **Prompt:** "A workspace shot. A user is typing on a laptop, and a notification bubble from their phone app (WhatsApp) appears *on the laptop screen*. **Text:** 'NEVER TOUCH YOUR PHONE AGAIN'. Focus on workflow."

---

## 3. Screenshot Prompts (The Project Gallery)

### **The Desktop Dashboard**
> **Prompt:** "A desktop app window. **Header:** 'Connected: iPhone 15 Pro - Battery 85%'. **Grid:** Latest 50 photos from the phone's camera roll displayed beautifully. **Action:** A cursor dragging a photo from the app to the Windows Desktop."

### **The "Universal Clipboard" Toast**
> **Prompt:** "A close-up of the screen corner. **Notification:** 'Clipboard Sycned from Phone'. **Subtitle:** 'Copied: https://example.com/link'. Minimal toast design."

### **The Mobile App (Sync Status)**
> **Prompt:** "A mobile app interface. **Center:** A large pulsing radar animation looking for 'Nearby PCs'. **List:** 'MacBook Pro (Trusted)', 'Office PC'. **Toggle:** 'Auto-Back Up New Photos'."

### **The Messaging Interface**
> **Prompt:** "A Message window on Desktop. **Left:** List of SMS conversations synced from phone. **Right:** Chat view. **Input:** User typing a reply. **Badge:** 'Sent via Phone'."

---

## 4. AI Assistant Prompts (For Building the Project)

### **A. WebRTC Signaling Server (Local Discovery)**
> "Act as a Networking Expert. I need a discovery mechanism for a local network. Write a Node.js script that uses UDP Multicast to broadcast 'I am here' packets. When a peer receives it, they should initiate a WebRTC handshake. Handle PC firewalls."

### **B. Android SMS Reader (Native Module)**
> "Write a React Native Native Module (Java/Kotlin) that: 1. Requests `READ_SMS` permission. 2. Queries the `Telephony.Sms.Inbox` content provider. 3. Returns the last 50 messages as a JSON array. 4. Sets up a `ContentObserver` to trigger an event on *new* SMS arrival."

### **C. Incremental Photo Backup Logic**
> "Write a TypeScript algorithm for the 'Smart Backup' feature. It needs to check the phone's Camera Roll against a list of 'Already Backed Up' hashes stored on the PC. It should only transfer files that are new or modified. Optimize for thousands of photos."
