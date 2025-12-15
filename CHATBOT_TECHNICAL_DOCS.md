# 🤖 Chatbot Technical Documentation

## 1. 🏗️ Architecture Overview
The Chatbot is a **Real-Time Communication System** bridging the gap between Website Visitors and the Admin via **Discord** and **WhatsApp**.

### Core Components:
1.  **Frontend Widget (`ChatWidget.jsx`):** A React component using `socket.io-client` to send/receive messages.
2.  **Backend Server (`server/server.js`):** A Node.js/Express server handling WebSocket connections.
3.  **Discord Bot (`server/discord/bot.js`):** Acts as the "Admin Dashboard". Messages from users appear in a private Discord channel. Admin replies in Discord are forwarded to the user.
4.  **WhatsApp Client (`server/whatsapp/client.js`):** (Optional) Forwards urgent alerts to the Admin's WhatsApp.

---

## 2. 🛠️ Tech Stack & Justification

### **Backend: Node.js + Socket.io**
*   **Why?** We needed **bi-directional real-time communication**. HTTP polling is too slow and resource-heavy.
*   **Alternative:** **Firebase Realtime Database**.
    *   *Why not?* Firebase gets expensive at scale. Socket.io is free (self-hosted).
*   **Alternative:** **Pusher**.
    *   *Why not?* Vendor lock-in and pricing limits.

### **Admin UI: Discord**
*   **Why?** You already use Discord. Building a custom Admin Dashboard (React + Auth + Database) takes weeks. Discord provides a free, mobile-friendly, secure interface out of the box.
*   **Alternative:** **Slack**. (Similar, but Discord has better bot limits for free).
*   **Alternative:** **Custom Dashboard**. (Overkill for a portfolio).

### **WhatsApp Integration: Puppeteer (whatsapp-web.js)**
*   **Why?** Official WhatsApp API charges per conversation. Puppeteer automates a web browser to send messages for free.
*   **Trade-off:** Requires a heavier server (Chrome) and session management.

---

---

## 4. ❓ Potential Interview Questions

**Q: How does this scale to 10,000 users?**
*   **A:** Currently, it uses in-memory storage. To scale, I would use **Redis Adapter** for Socket.io to distribute events across multiple server nodes.

**Q: Why didn't you use a Serverless function (Next.js API)?**
*   **A:** Serverless functions are stateless and shut down immediately. WebSockets require a **persistent connection**. That's why I deployed the backend to a container (Render/Docker).

**Q: How do you handle security?**
*   **A:** We use **CORS** to restrict origins. For production, I would implement **JWT Authentication** to verify user identity before establishing the socket connection.

**Q: What happens if the server crashes?**
*   **A:** The frontend automatically attempts to reconnect. However, in-memory chat history is lost. To fix this, I would persist messages to **MongoDB** or **PostgreSQL**.

---

## 5. 📂 Directory Structure
```
server/
├── discord/         # Discord Bot Logic
├── socket/          # WebSocket Logic (io.js)
├── storage/         # JSON Logs
├── whatsapp/        # WhatsApp Client
└── server.js        # Entry Point
```
