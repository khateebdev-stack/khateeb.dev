# Software Requirements Specification (SRS)
## Project Name: DocuMind AI - Intelligent Contract Analysis Platform

---

## 1. Executive Summary
**DocuMind AI** is a B2B SaaS platform that uses Large Language Models (LLMs) to analyze legal documents. It helps freelancers, agencies, and small businesses understand complex contracts without hiring expensive lawyers. Users upload a PDF, and the AI highlights "Red Flags," explains clauses in plain English, and suggests safer negotiation terms.

**Target Audience:** Freelancers, Agencies, SME Founders.
**Core Value:** "A Lawyer on your shoulder for $29/mo."

---

## 2. User Personas & Stories

### **Persona A: Sarah (Freelance Designer)**
*   **Problem:** Client sent a 20-page NDA. She is afraid to sign but can't afford a lawyer.
*   **Goal:** Quickly know if the contract steals her IP rights.
*   **User Story:** "As a freelancer, I want to upload a PDF and see a list of 'Dangerous Clauses' so I don't accidentally sell my soul."

### **Persona B: Mike (Agency Owner)**
*   **Problem:** Manages 50+ contracts a month. Loses track of renewal dates.
*   **Goal:** A dashboard to organize contracts and get alerts.
*   **User Story:** "As an agency owner, I want to search across all my contracts for 'Termination Clause' to see which clients I can fire."

---

## 3. Functional Requirements

### **3.1. Authentication & Onboarding**
*   **FR-01:** User must sign up via Google (OAuth) or Email/Password (NextAuth).
*   **FR-02:** User must select a "Role" (Freelancer vs Business) to adjust AI strictness.

### **3.2. Document Processing (The Core)**
*   **FR-03:** User can upload PDF, DOCX, or TXT files (Max 50MB).
*   **FR-04:** System must perform OCR (Optical Character Recognition) on scanned PDFs.
*   **FR-05:** System must chunk text and store embeddings in Vector Database (Pinecone).

### **3.3. AI Analysis Engine**
*   **FR-06:** **"Red Flag Detection":** AI must identify clauses related to:
    *   Non-Compete (High Risk)
    *   IP Ownership (High Risk)
    *   Indemnification (Medium Risk)
*   **FR-07:** **"Plain English Translator":** User can hover over any legal jargon to see a simple definition.
*   **FR-08:** **"Chat with Doc":** User can ask questions like "Can I work for other clients?" and get answers with citations.

### **3.4. Dashboard & Management**
*   **FR-09:** List view of all analyzed documents with "Risk Score" (0-100).
*   **FR-10:** Folder organization (e.g., "Client Contracts", "NDAs").

---

## 4. Technical Architecture

### **Frontend (Next.js 14)**
*   **Framework:** Next.js App Router (Server Components).
*   **UI Library:** Shadcn/UI + Tailwind CSS.
*   **State:** Zustand (for document viewer state).
*   **PDF Viewer:** `react-pdf` with custom annotation layer.

### **Backend (Node.js + Python)**
*   **API:** Next.js API Routes (Edge Runtime for fast streaming).
*   **AI Orchestration:** LangChain.js.
*   **Vector DB:** Pinecone (to store contract knowledge).
*   **LLM:** OpenAI GPT-4o (for analysis).

### **Database (PostgreSQL)**
*   **ORM:** Prisma.
*   **Tables:** `Users`, `Documents`, `Analyses`, `Subscriptions`.

---

## 5. Implementation Process (Step-by-Step)

### **Phase 1: The "Reader" (Days 1-3)**
1.  Setup Next.js + Shadcn UI.
2.  Build File Upload component (Drag & Drop).
3.  Integrate `pdf-parse` to extract raw text from PDFs.

### **Phase 2: The "Brain" (Days 4-7)**
1.  Setup OpenAI API connection.
2.  Create the "Risk Analysis Prompt" (System Prompt).
3.  Build the UI to display "Red Flags" as sidebar cards.

### **Phase 3: The "Chat" (Days 8-10)**
1.  Implement RAG (Retrieval Augmented Generation).
2.  Chunk PDF text -> Embeddings -> Pinecone.
3.  Build the Chat Interface (Streaming text).

---

## 6. AI Prompts (For Development)

### **A. System Prompt for Contract Analysis**
> "You are an expert Senior Legal Counsel. Your job is to protect a Freelancer. Analyze the following contract text. Identify any clauses that are 'High Risk' (e.g., unlimited liability, non-compete, IP transfer). For each risk, provide a 'Severity Score' (1-10) and a 'Plain English Explanation'. Output JSON format."

### **B. Prompt for Generating the UI Code**
> "Create a React component called `ContractViewer`. It should have a split-screen layout. Left side: A scrollable PDF viewer. Right side: A 'Risk Analysis' sidebar. The sidebar should have accordion items for each risk (High, Medium, Low). Use Tailwind CSS and Lucide Icons."

---

## 7. Visual Assets Prompts

### **A. Thumbnail (Marketing)**
> **Prompt:** "A split-screen composition. Left side: A blurry legal document with a magnifying glass over it. Right side: A clean, modern dashboard showing a 'Safety Score: 98%' in green. A robotic hand holding a pen. Text overlay: 'AI LEGAL ASSISTANT'. Professional Blue and White color scheme."

### **B. UI Mockup (Dashboard)**
> **Prompt:** "High-fidelity UI design of a SaaS dashboard. Dark mode. Sidebar navigation. Main content area shows a list of recent contracts. Each row has a 'Risk Badge' (Red/Yellow/Green). Top card shows 'Total Money Saved: $5,000'. Clean typography (Inter font)."

### **C. UI Mockup (Analysis View)**
> **Prompt:** "A web interface showing a contract analysis. The screen is split 50/50. Left: The document text with specific sentences highlighted in Red. Right: An AI chat bubble explaining 'This clause allows the client to sue you for unlimited damages'. Modern, clean, trustworthy design."
