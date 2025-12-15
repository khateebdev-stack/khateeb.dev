# AI Prompts for EchoMesh Project

This file contains all the AI prompts you need to build, design, and market the **EchoMesh** project.

---

## 1. UI Design Prompts (Global Style & Layouts)

### **A. The "Tactical Survival" Aesthetic (Dark & High Contrast)**
> **Prompt:** "A high-fidelity UI/UX design system for an offline survival app called 'EchoMesh'. **Color Palette:** Midnight Black (#121212), Safety Orange (#F97316) for alerts, and Signal Green (#22C55E) for connections. **Typography:** Roboto Condensed or a Monospaced font (Terminal style). **Style:** Rugged, utilitarian, high contrast for outdoor visibility. **Elements:** Radar sweeps, bold signal bars, map grids."

---

## 2. Thumbnail Prompts (High CTR)

1.  **The "No Signal" Hook:**
    > **Prompt:** "A close-up of a phone screen showing 'No Service' and 'No Wi-Fi' icons in red. Yet, a chat message 'I am safe, don't worry' pops up in green. **Text:** 'CHAT WITHOUT INTERNET'. Mystery/Tech vibe."

2.  **The "Festival/Crowd" Hook:**
    > **Prompt:** "A view of a massive music festival crowd. A glowing blue mesh network web overlays the people, connecting their phones. **Text:** 'UNBLOCKABLE NETWORK'. Social/Event vibe."

---

## 3. Screenshot Prompts (The Project Gallery)

### **The Radar Home Screen**
> **Prompt:** "A mobile UI. **Main Visual:** A sonar radar scanning effect. Dots represent nearby users. **List:** 'John (50m)', 'Sarah (Relay Node - 200m)'. **Status:** 'Mesh Network: Active (5 Peers)'. Dark tactical theme."

### **The "Hop" Visualization**
> **Prompt:** "A visual explorer of a message path. **Visual:** Phone A -> Phone B -> Phone C. **Line:** A dotted line tracing the path. **Tooltip:** 'Relayed by 2 peers'. Shows the power of the mesh."

### **The Offline Map**
> **Prompt:** "A map interface using dark topographic tiles. **Markers:** Orange pins for 'Hazards', Blue pins for 'Users'. **Overlay:** A circle showing 'Your Broadcast Range'. **Action:** Floating button 'Drop Pin'."

### **The SOS Emergency Mode**
> **Prompt:** "A terrifyingly simple screen. **Background:** Flashing Red. **Center:** A giant button 'BROADCAST SOS'. **Text:** 'This will share your GPS & Medical ID with everyone nearby'. High urgency design."

---

## 4. AI Assistant Prompts (For Building the Project)

### **A. BLE Advertising & Scanning (The Core)**
> "Act as a Bluetooth Engineer. I need to implement the discovery phase. Write a React Native script using `react-native-ble-plx` that: 1. Advertises a specific Service UUID (EchoMesh). 2. Scans for that UUID in the background. 3. Maintains a 'Neighbor Table' of RSSI strengths."

### **B. Message Packet Structure (Binary Optimization)**
> "We need to keep packets small for BLE. Design a binary packet structure. Requirements: Header (Type, SenderID, MessageID, TTL), Payload (Compressed Text). Write a TypeScript function to `encode` and `decode` this structure using `ArrayBuffer`."

### **C. The "Epidemic" Routing Logic**
> "Implement the 'Store and Forward' logic. When a packet is received: 1. Check if we have seen this `MessageID` before (Deduplication). 2. If no, save to local DB. 3. Re-broadcast to all other connected peers. 4. Decrement TTL. Write this logic in JavaScript."
