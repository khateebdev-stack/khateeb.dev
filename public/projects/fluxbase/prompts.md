# AI Prompts for FluxBase Project

This file contains all the AI prompts you need to build, design, and market the **FluxBase** project.

---

## 1. UI Design Prompts (Global Style & Layouts)

### **A. The "Founder's Studio" Aesthetic (Professional & Creative)**
> **Prompt:** "A high-fidelity UI/UX design system for a No-Code Backend Builder called 'FluxBase'. **Color Palette:** Slate Blue (#475569), Vibrant Indigo (#6366F1), and Success Green (#10B981). **Typography:** Inter (Clean, legible). **Style:** SaaS dashboard, flat design with subtle gradients, card-based layout. **Vibe:** 'As easy as Lego, as powerful as AWS'. **Elements:** Node connectors, minimaps, code-preview panels."

---

## 2. Thumbnail Prompts (High CTR)

1.  **The "No-Code" Hook:**
    > **Prompt:** "A split screen. **Left:** elaborate Javascript code on a dark monitor with a red 'X'. **Right:** A clean visual flowchart logic with a green checkmark. **Text:** 'Stop Writing Boilerplate'. Modern 3D style."

2.  **The "Visual Coding" Hook:**
    > **Prompt:** "A close-up of a hand dragging a digital block labeled 'Stripe Payment' and snapping it into a 'Database' block. Sparks/particles fly at the connection point. **Text:** 'VISUAL BACKEND BUILDER'. Cyberpunk light accents."

---

## 3. Screenshot Prompts (The Project Gallery)

### **The Schema Designer**
> **Prompt:** "A UI design of a Database Schema builder. **Canvas:** Infinite canvas with floating cards representing tables (Users, Orders, Products). **Lines:** Connecting lines showing relationships (1:N, N:N). **Sidebar:** 'Add Column' properties panel (Type: String, Boolean, JSON). **Action:** User is renaming a column."

### **The Logic Flow Editor**
> **Prompt:** "A full-screen view of the Logic Editor. **Nodes:** 'Start: GET /users', 'Middleware: Auth', 'DB: Find Users', 'Response: 200'. **Data Flow:** Glowing wires connecting the nodes showing data packet size. **Bottom Panel:** A 'Console Log' output window."

### **The API Dashboard**
> **Prompt:** "An API management dashboard. **List:** A clean list of generated endpoints (GET /api/v1/users). **Badges:** 'Auth Required' (Lock icon), 'Cached' (Lightning icon). **Right Panel:** A Swagger-like API tester playground where a request is being sent."

### **The "Eject Code" Modal**
> **Prompt:** "A modal window overlay. **Title:** 'Export Your Backend'. **Options:** 'Docker Image', 'Node.js Source', 'Serverless Function'. **Visual:** A terminal window showing code compiling and a 'Download.zip' button pulsing."

---

## 4. AI Assistant Prompts (For Building the Project)

### **A. React Flow Custom Node**
> "Act as a React Expert. I need a custom node for 'React Flow' that represents a Database Table. It needs: 1. A dynamic list of inputs (columns). 2. A handle on the left for incoming relationships. 3. A handle on the right for outgoing relationships. Use Tailwind for styling."

### **B. JSON to Code Transpiler (The Core)**
> "I have a JSON array representing a logic flow: `[{ type: 'db_query', query: 'SELECT * FROM users' }, { type: 'response', status: 200 }]`. Write a TypeScript function that takes this array and outputs a string containing valid Express.js route code. Handle the async/await structure."

### **C. Dockerfile Generator**
> "Write a function that generates a `Dockerfile` for a Node.js application dynamically based on user settings (e.g., Node version, exposed ports, environment variables). It should return the file content as a string."
