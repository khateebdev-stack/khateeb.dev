# Software Requirements Specification (SRS)
## Project Name: EchoMesh - Offline Disaster Communication App

---

## 1. Executive Summary
**EchoMesh** is a decentralized, offline-first mobile application that allows users to communicate, share locations, and broadcast SOS signals **without Internet or Cellular Service**. It creates a "Mesh Network" using Bluetooth Low Energy (BLE) and Wi-Fi Direct, hopping messages from phone to phone until they reach a recipient (or an internet gateway).

**Target Audience:** Hikers, Protestors, Disaster Victims, Event Attendees (Festivals).
**Core Value:** "Stay connected when the grid goes down."

---

## 2. User Personas & Stories

### **Persona A: The Hiker**
*   **Problem:** Get separated from the group in a remote mountain area with zero signal.
*   **Goal:** See where friends are pointing on a map relative to them.
*   **User Story:** "As a hiker, I want to open the map and see my friend's dot, even though we have no 4G."

### **Persona B: The Disaster Victim**
*   **Problem:** Earthquake knocked out cell towers. Trapped under rubble.
*   **Goal:** Broadcast an SOS signal to anyone nearby.
*   **User Story:** "As a victim, I want to press a 'Red Button' that blasts my GPS coordinates to every phone within 1 mile."

---

## 3. Functional Requirements

### **3.1. The Mesh Engine**
*   **FR-01:** **Device Discovery:** Continuously scan for nearby devices via BLE.
*   **FR-02:** **Message Hopping:** If User A wants to message User C, but can't see them, pass the message to User B (who is in the middle) to relay it.
*   **FR-03:** **Store & Forward:** If no path is available, store the message and send it automatically when a node comes into range.

### **3.2. Communication Features**
*   **FR-04:** **Public Broadcast:** "Shout" Messages visible to everyone nearby.
*   **FR-05:** **Private Encrypted Chat:** End-to-End encrypted 1-on-1 messages.
*   **FR-06:** **Offline Maps:** Download map regions (OpenStreetMap) for offline use.

### **3.3. Safety Tools**
*   **FR-07:** **SOS Beacon:** High-priority packet broadcast with Medical ID and Location.
*   **FR-08:** **Compass/Navigation:** AR overlay pointing to the friend's location.

---

## 4. Technical Architecture

### **Mobile App (React Native + Native Modules)**
*   **Framework:** React Native.
*   **Mesh Library:** `react-native-multipeer-connectivity` (iOS) and Google Nearby Connections API (Android) bridged to a unified JS interface.
*   **Encryption:** Signal Protocol (Double Ratchet) for forward secrecy.

### **Routing Algorithm**
*   **Logic:** Custom Flooding or Epidemic Routing protocol (since battery is constrained).
*   **TTL (Time To Live):** Packets expire after N hops to prevent network congestion.

---

## 5. Implementation Process

### **Phase 1: The Connection (Days 1-7)**
1.  Build the Cross-Platform Bridge for BLE/Wi-Fi Direct.
2.  Implement simple "Hello World" ping between two phones in Airplane Mode.

### **Phase 2: The Mesh (Days 8-14)**
1.  Implement the Relay Logic (Packet Forwarding).
2.  Build the "Nearby User List" UI.

### **Phase 3: The Map & Chat (Days 15-21)**
1.  Integrate Mapbox/OpenStreetMap for offline tiles.
2.  Build the Chat UI.

---

## 6. AI Prompts (For Development)

### **A. System Prompt for Mesh Logic**
> "Act as a Network Protocol Engineer. Design a lightweight routing protocol for a mobile ad-hoc network (MANET). Devices move randomly. Battery is limited. Suggest a strategy for 'Message Flooding' that avoids loops and duplicates. Write pseudocode for the 'Packet Received' handler."

### **B. Prompt for BridgeTwoPhones**
> "I need to connect an Android Phone and an iPhone locally. Android uses Wi-Fi Direct, iOS uses Multipeer Connectivity. Can we use BLE (Bluetooth Low Energy) as the common denominator? Write a React Native implementation using `react-native-ble-plx` that establishes a GATT connection to transfer text strings."

---

## 7. Visual Assets Prompts

### **A. Thumbnail (Marketing)**
> "A dramatic composition. **Background:** A dark city with a power outage (no lights). **Foreground:** Three smartphones glowing with a blue network line connecting them. **Text:** 'OFFLINE PROOF MESSAGING'. Cinematic, survivalist vibe."

### **B. UI Mockup (The Radar Map)**
> "A dark mode map UI. **Style:** Tactical / Radar. **Center:** User location. **Surroundings:** Green dots showing 'Peers (300m Away)'. **Bottom:** A 'Broadcast Message' input field. **Top Right:** 'Mesh Strength: Strong'."
