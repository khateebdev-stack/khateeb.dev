# 🚀 Deployment & Architecture Guide

## 1. 🐳 What is Docker and Why Use It?

### The Problem: "It works on my machine"
You write code on Windows. You deploy to Linux.
*   Your Node version is 20. The server has 18. **Crash.**
*   You use a specific library for WhatsApp. The server lacks Chrome. **Crash.**

### The Solution: Docker
Docker packages your code + the operating system + all libraries into a **Container**.
*   **Consistency:** If it runs on your laptop in Docker, it runs *everywhere* (Render, AWS, DigitalOcean).
*   **Isolation:** The backend doesn't mess with the frontend.

---

## 2. 🏗️ Repository Strategy: Separate or Together?

### ❌ Monorepo (Everything in one folder)
*   **Pros:** Easy to edit code.
*   **Cons:** Hard to deploy. Vercel tries to build the backend (and fails). Render tries to build the frontend (and fails).
*   **Verdict:** Avoid for now.

### ✅ Polyrepo (Separate Repositories) - RECOMMENDED
**Repo 1: Frontend (`khateeb-portfolio`)**
*   **Contains:** `src/`, `public/`, `next.config.mjs`.
*   **Deploy to:** **Vercel** (Best for Next.js).
*   **Why:** Vercel gives you free CDN, fast images, and instant deployments.

**Repo 2: Backend (`khateeb-chatbot-backend`)**
*   **Contains:** `server/`, `Dockerfile`, `package.json` (for backend).
*   **Deploy to:** **Render** or **Hugging Face Spaces**.
*   **Why:** These platforms support **Docker** and long-running servers (needed for Socket.io/Chatbot).

---

## 3. 🛠️ How to Separate Them (Step-by-Step)

### Step A: Clean up the Frontend Repo
1.  Keep your current folder as the **Frontend**.
2.  Delete `server/` folder from here (after backing it up!).
3.  Push to GitHub -> Connect to Vercel.

### Step B: Create the Backend Repo
1.  Create a new folder `khateeb-backend` on your computer.
2.  Copy the `server/` folder content into it.
3.  Move `server.js` to the root of this new folder.
4.  Create a `package.json` for the backend (run `npm init -y` and install `express socket.io`).
5.  Add the `Dockerfile` (I created it for you).
6.  Push to GitHub -> Connect to Render/Hugging Face.

---

## 4. ☁️ Free Deployment Platforms for Backend

### Option A: Render (Easiest)
*   **Cost:** Free (Spins down after 15 mins of inactivity).
*   **Pros:** Easy setup. Supports Docker.
*   **Cons:** The first request after a break takes 30 seconds (Cold Start).

### Option B: Hugging Face Spaces (Best for AI)
*   **Cost:** Free (Always on if popular, otherwise sleeps).
*   **Pros:** Generous free tier. Great for Chatbots.
*   **Cons:** Public by default (can be private).

### Option C: Railway (Paid)
*   **Cost:** $5/month.
*   **Pros:** Never sleeps. Very fast.
*   **Cons:** No longer free.

---

## 5. 🔗 Connecting Frontend to Backend
Once deployed, you will get a URL from Render (e.g., `https://khateeb-backend.onrender.com`).

1.  Go to Vercel Dashboard -> Settings -> Environment Variables.
2.  Add `NEXT_PUBLIC_CHATBOT_URL` = `https://khateeb-backend.onrender.com`.
3.  Redeploy Vercel.
4.  **Done!** Your Vercel frontend now talks to your Render backend.
