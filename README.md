# Khateeb.dev - The Ultimate Portfolio & Chat App

A cutting-edge personal portfolio website built with **Next.js 14**, featuring a "Hacker Stack" communication system that integrates **Discord**, **WhatsApp**, and a **Smart AI Chatbot**.

## 🚀 Features

### 🎨 Frontend (Next.js 14 + Tailwind CSS)
*   **Modern UI/UX:** Glassmorphism, dark/light mode, and smooth animations using Framer Motion.
*   **Responsive Design:** Mobile-first approach ensuring a perfect experience on all devices.
*   **Dynamic Content:** JSON-driven data for easy updates to Portfolio, Services, and Resume.
*   **Rich Media:** Support for file sharing, image previews, and interactive elements.

### 🤖 The "Hacker Stack" (Backend Communication)
A custom Node.js server (`server/server.js`) powers the real-time communication layer:

1.  **Live Chat Widget (Socket.io):**
    *   **True Persistence:** Chat history is synced from Discord threads upon connection.
    *   **Real-time Status:** Instantly reflects the Admin's Discord status (Online/DND/Offline).
    *   **Smart Chatbot:** "Engagement First" logic answers visitor queries from a JSON knowledge base when the Admin is offline.
    *   **Rich Media:** Supports file uploads (drag & drop) and emoji reactions.

2.  **Discord Admin Bridge (discord.js):**
    *   **Discord as Admin Panel:** Every visitor gets a dedicated thread in a private Discord channel.
    *   **Two-Way Sync:** Messages sent in Discord appear on the website instantly, and vice versa.
    *   **Slash Commands:** Manage tickets, generate invoices, and schedule meetings directly from Discord.

3.  **WhatsApp Integration (whatsapp-web.js):**
    *   (Optional) Bridges communication to WhatsApp for mobile admin access.

## 🛠️ Tech Stack

*   **Framework:** Next.js 14 (App Router)
*   **Styling:** Tailwind CSS, ShadCN UI
*   **Backend:** Node.js, Express
*   **Real-time:** Socket.io
*   **Bots:** discord.js, whatsapp-web.js
*   **Deployment:** Vercel (Frontend), VPS/Heroku (Backend)

## 📦 Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/khateebdev-stack/khateeb.dev.git
    cd khateeb.dev
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Setup Environment Variables:**
    Create a `.env.local` file with the following:
    ```env
    # Discord Bot
    DISCORD_TOKEN=your_bot_token
    DISCORD_GUILD_ID=your_server_id
    DISCORD_CHANNEL_ID=your_channel_id
    
    # Socket.io
    NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
    ```

4.  **Run the Development Server:**
    ```bash
    # Terminal 1: Frontend
    npm run dev

    # Terminal 2: Custom Backend
    node server/server.js
    ```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
