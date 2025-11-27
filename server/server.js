require('dotenv').config(); // Load .env
require('dotenv').config({ path: '.env.local' }); // Load .env.local (if exists)
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const whatsappClient = require('./whatsapp/client');
const discordBot = require('./discord/bot');
const socketHandler = require('./socket/io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    maxHttpBufferSize: 1e8, // 100MB limit for file uploads
    cors: {
        origin: "*", // Allow all origins for now (dev)
        methods: ["GET", "POST"]
    }
});

// Connect to MongoDB (Optional for now, but good to have)
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));

// Initialize Modules
whatsappClient.initialize(io);
discordBot.initialize(io);
socketHandler.initialize(io);

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
    console.log(`> Custom Server running on port ${PORT}`);
});
