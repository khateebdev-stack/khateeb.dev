# AI Prompts for NeuroSync Project

This file contains all the AI prompts you need to build, design, and market the **NeuroSync** project.

---

## 1. UI Design Prompts (Global Style & Layouts)

### **A. The "Cyber-Brain" Aesthetic (Dark & Neon)**
> **Prompt:** "A high-fidelity UI/UX design system for an AI Operating System called 'NeuroSync'. **Color Palette:** Deep Obsidian (#000000), Electric Blue (#2563EB), and Neon Purple (#7C3AED). **Typography:** Geist Mono or JetBrains Mono. **Style:** Futuristic, HUD-like, minimal borders, high transparency. **Vibe:** 'Iron Man's Jarvis' meets 'VS Code'. **Elements:** Holographic graphs, floating search bars, glowing edges. 8k resolution."

### **B. The "Focus Mode" Aesthetic (Zen Minimalist)**
> **Prompt:** "A Zen-focused UI mode. **Background:** Soft blurred gradient (Warm Orange to Soft Pink). **Content:** Only the essential task is visible in the center. All sidebars are hidden. **Text:** Large, serif typography for the current goal. **Controls:** Subtle floating buttons that appear only on hover. Distraction-free excellence."

---

## 2. Thumbnail Prompts (High CTR)

1.  **The "Impossible Tech" Hook:**
    > **Prompt:** "A YouTube thumbnail. **Left:** A messy desktop with 50 open windows and a stressed user. **Right:** A clean, glowing interface with a 3D AI brain organizing the files automatically. **Text:** 'AI ORGANIZES YOUR LIFE'. High contrast, blue vs red color grading."

2.  **The "Privacy" Hook:**
    > **Prompt:** "A conceptual 3D render. A shield made of glass protecting a laptop. Outside the shield, menacing 'Cloud' icons (eyes, servers) try to get in but bounce off. **Text:** '100% PRIVATE AI'. Visualizing 'Local-First' technology."

3.  **The "Time Travel" Hook:**
    > **Prompt:** "A split screen. **Left:** 'Found it in 2 seconds'. **Right:** 'Spent 3 hours searching'. **Visual:** A user using a 'Time Scrubber' on their screen to go back to a past meeting. **Text:** 'CTRL+Z FOR REAL LIFE'. Exciting, cinematic lighting."

---

## 3. Screenshot Prompts (The Project Gallery - 15 Screens)

### **Desktop App (Tauri)**
1.  **The "Rewind" Timeline:** "A desktop UI showing a timeline scrubber at the bottom. The user is scrubbing back to 'Yesterday 2 PM'. The main screen shows a ghosted overlay of what was on the screen (a Zoom call). OCR text boxes are highlighted on the video."
2.  **The "Universal Search" Bar:** "A distinct search bar floating in the center of the desktop (Spotlight style). Input: 'That PDF Mike sent about Q3'. Results: A list showing an Email, a Slack message, and a File, all ranked by relevance. Dark mode."
3.  **The "Context Graph" Visualization:** "A 3D node graph UI. Nodes represent 'People', 'Projects', and 'Files'. Lines connect them. The user hovers over 'Project Alpha' and sees all related files light up. Sci-fi aesthetic."
4.  **The "Focus Shield" Active:** "A full-screen overlay. The background apps are blurred out. In the center: 'Deep Work Mode: Coding'. A timer counts down. A blocked notification tries to appear but is incinerated by a shield animation."
5.  **The "Local LLM" Chat:** "A chat interface similar to ChatGPT, but with a 'Local: Llama-3' badge. The user asks 'Summarize my activity today'. The AI replies with bullet points based on the screen recording data. Green accent colors."

### **Mobile App (React Native)**
6.  **The "Smart Notification" Lock Screen:** "An iOS Lock Screen mockup. Instead of a list of 50 notifications, there is a single card: 'NeuroSync Summary: 3 Urgent items (Wife, Boss, Server). 42 Distractions blocked'. Clean, efficient."
7.  **The "Voice Memo" Triage:** "A minimal voice recording interface. A waveform moves as the user speaks. Real-time transcription appears below. **Action:** 'Auto-Convert to Jira Ticket' button."
8.  **The "Sync Status" Dashboard:** "A mobile settings screen. Showing 'Connected to Desktop: MacBook Pro'. 'Sync Status: Encrypted P2P connection'. A rotating 3D sync icon."
9.  **The "Remote Control" View:** "The mobile app controlling the desktop. Buttons for 'Enable Focus Mode', 'Shutdown', 'Mute Mic'. Dark UI."

### **Web Dashboard (Next.js)**
10. **The "Productivity Heatmap":** "A web dashboard showing a Github-style contribution graph, but for 'Focus Hours'. Dark squares mean high productivity. Tooltip: 'Oct 24 - 8 Hours Deep Work'."
11. **The "App Usage" Breakdown:** "A donut chart showing 'Time Spent'. Coding: 40%, Meetings: 20%, Social Media: 10%. Distractions are highlighted in Red."
12. **The "Team Pulse" (Manager View):** "A team view. A list of team members with 'Status' indicators. 'John: Deep Work (Do Not Disturb)', 'Sarah: In Meeting'. No spy-ware screenshots, just status."
13. **The "Burnout Warning":** "A health widget. 'Warning: High context switching detected today. Recommendation: Take a 15 min break.' a calm, wellness-focused UI."
14. **The "data Privacy" Audit:** "A settings page showing 'Data Storage: Local'. 'Cloud Backups: Off'. Large toggle switches. 'Delete All Data' danger button."
15. **The 404 / Glitch:** "A 'Matrix' style error page. Binary code raining down. 'Connection Lost in the Matrix'. Use the 'Rewind' button to go back."

---

## 4. AI Assistant Prompts (For Building the Project)

### **A. Rust System Hooks (Tauri)**
> "Act as a Rust Expert. I need to capture the active window title on Windows. Use the `winapi` crate. Write a function `get_active_window_title()` that returns a String. It needs to be safe and handle non-UTF8 characters. Also, how do I expose this function to the React frontend in Tauri v2?"

### **B. Local Vector DB (Python/Chroma)**
> "I am running ChromaDB locally. I want to create a collection called 'screen_context'. Write a Python script to: 1. Receive a text chunk + metadata (app_name, timestamp). 2. Generate an embedding using `sentence-transformers` (all local). 3. Upsert it into Chroma. Optimize for speed."

### **C. React Native Notification Listener**
> "Write a Kotlin (Android) module for React Native. It needs to extend `NotificationListenerService`. It should intercept every incoming notification, read the `title` and `text`, and send it to the JavaScript side via a Bridge. **Crucial:** It must be able to 'cancel' (hide) the notification if the JS side returns 'BLOCK'."

### **D. Llama-3 Prompt Engineering**
> "I am using Llama-3-8B locally to triage notifications. Write a System Prompt. The input will be: `App: Instagram, Content: Dave liked your photo`. The output must be JSON: `{ urgency: 'low', logic: 'Social media generic', action: 'block' }`. The AI should prioritize 'Boss', 'Server Alerts', and 'Family'."
