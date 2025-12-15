# 🔌 Chatbot Integration Guide

## 1. 🌐 How to Use This Chatbot on ANY Website
You can embed this chatbot on a WordPress site, a Shopify store, or another React app.

### Step 1: Deploy the Backend
Follow the `DEPLOYMENT_GUIDE.md` to deploy the backend to Render.
You will get a URL: `https://your-backend.onrender.com`.

### Step 2: Embed the Widget (React)
If you have another React app, copy the `src/components/chat` folder into your project.
Install dependencies:
```bash
npm install socket.io-client framer-motion lucide-react
```
Set the environment variable:
```env
NEXT_PUBLIC_CHATBOT_URL=https://your-backend.onrender.com
```

### Step 3: Embed via Script Tag (HTML/WordPress)
*Currently, the widget is a React Component.*
To use it on a non-React site, you would need to bundle it into a single `.js` file (using Webpack/Vite) and include it like this:
```html
<div id="chat-root"></div>
<script src="https://your-cdn.com/chat-widget.bundle.js"></script>
<script>
  window.initChatbot({ socketUrl: 'https://your-backend.onrender.com' });
</script>
```
*(This requires a build step to convert the React component to a standalone script).*

---

## 2. 📦 Deployment Checklist: What Files to Copy?

If you are separating the Backend from the Frontend, you **MUST** copy the following data files to the Backend repo:

1.  **`src/data/chatbot-commands.json`** -> Copy to `server/data/chatbot-commands.json`.
    *   *Reason:* The backend reads this file to handle `/price` and `/contact` commands.
    *   *Note:* You will need to update the path in `server/socket/io.js` to point to the new location.

2.  **`.env`** -> Copy variables to Render Environment Variables.
    *   `DISCORD_TOKEN`
    *   `DISCORD_GUILD_ID`
    *   `DISCORD_CHANNEL_ID`

---

## 3. 🔄 Updating the Backend Code
If you move the backend to a new repo, update `server/socket/io.js`:

**Change:**
```javascript
const commandsPath = path.join(__dirname, '../../src/data/chatbot-commands.json');
```
**To:**
```javascript
---

## 4. 🌍 SaaS & Script Tag Guide (Advanced)

### A. Using via Script Tag (No React Required)
If you want to let others use your chatbot on their websites (like Intercom/Drift), you need to bundle the widget into a single JS file.

**Steps:**
1.  Create a new entry point `widget-entry.js`:
    ```javascript
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import ChatWidget from './ChatWidget';

    window.initChatbot = (config) => {
        const div = document.createElement('div');
        div.id = 'khateeb-chatbot';
        document.body.appendChild(div);
        const root = ReactDOM.createRoot(div);
        root.render(<ChatWidget socketUrl={config.socketUrl} />);
    };
    ```
2.  Use **Vite** or **Webpack** to bundle this into `chatbot.bundle.js`.
3.  Host this file on a CDN (or Vercel public folder).
4.  Users include it like this:
    ```html
    <script src="https://your-domain.com/chatbot.bundle.js"></script>
    <script>
        window.initChatbot({ socketUrl: 'https://your-backend.onrender.com' });
    </script>
    ```

### B. Security & Multi-Tenancy (SaaS Mode)
If you want to sell this as a service, you need to secure it.

**1. Origin Check (CORS)**
In `server/server.js`, restrict which domains can connect:
```javascript
const io = new Server(server, {
    cors: {
        origin: ["https://client-website.com", "https://another-client.com"],
        methods: ["GET", "POST"]
    }
});
```

**2. API Keys**
Give each client an API Key. Check it during connection:
*   **Client:** `io(URL, { auth: { apiKey: 'xyz' } })`
*   **Server:**
    ```javascript
    io.use((socket, next) => {
        const apiKey = socket.handshake.auth.apiKey;
        if (isValid(apiKey)) next();
        else next(new Error("Invalid API Key"));
    });
    ```

**3. Routing Messages**
Currently, all messages go to **ONE** Discord channel.
For SaaS, you need to map `apiKey` -> `discordChannelId`.
*   Client A -> Channel A
*   Client B -> Channel B
This requires a database (MongoDB) to store Client Configs.

