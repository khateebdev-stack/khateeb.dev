const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

let io;

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('WhatsApp Client is ready!');
});

const { MessageMedia } = require('whatsapp-web.js');
const fs = require('fs');
const path = require('path');

// Privacy Trigger Keywords
const TRIGGERS = ['khateeb', 'portfolio', 'dev', 'help', 'menu', 'start', 'resume', 'cv'];

client.on('message', async msg => {
    const chat = await msg.getChat();
    let contact;
    try {
        contact = await msg.getContact();
    } catch (err) {
        // console.error('[WhatsApp] Error getting contact:', err.message);
        contact = { pushname: 'Unknown', number: msg.from.split('@')[0] };
    }
    const messageBody = msg.body.toLowerCase().trim();

    console.log(`[WhatsApp] Message from ${contact.pushname || contact.number}: ${messageBody}`);

    // 1. Privacy Trigger: Only respond if triggered or already in a bot session
    // (Simple session tracking could be added here, for now we check triggers)
    const isTriggered = TRIGGERS.some(t => messageBody.includes(t));

    // If it's a direct command number (1-4), allow it
    const isCommand = ['1', '2', '3', '4'].includes(messageBody);

    if (!isTriggered && !isCommand && !chat.isGroup) {
        // Ignore random personal messages to keep privacy
        return;
    }

    // 2. Main Menu
    if (isTriggered || messageBody === 'menu') {
        await chat.sendStateTyping();
        setTimeout(async () => {
            await msg.reply(
                `👋 *Hello ${contact.pushname || 'there'}!*\n\n` +
                `I am Khateeb's AI Assistant. How can I help you today?\n\n` +
                `1️⃣ *View Portfolio*\n` +
                `2️⃣ *My Services*\n` +
                `3️⃣ *Get Resume (PDF)*\n` +
                `4️⃣ *Book a Strategy Call*\n\n` +
                `_Reply with a number to proceed._`
            );
        }, 1000);
        return;
    }

    // 3. Handle Options
    switch (messageBody) {
        case '1': // Portfolio
            await msg.reply(`📂 *Featured Projects:*\n\n` +
                `1. *E-Commerce Platform* - Next.js, Stripe\n` +
                `2. *AI SaaS Dashboard* - React, Python\n` +
                `3. *Real Estate App* - Flutter, Firebase\n\n` +
                `🔗 View all: https://khateeb.dev/portfolio`);
            break;

        case '2': // Services
            await msg.reply(`🛠️ *My Expertise:*\n\n` +
                `💻 *Web Development* (React, Next.js)\n` +
                `📱 *Mobile Apps* (React Native, Flutter)\n` +
                `🔗 *Blockchain Solutions* (Solidity, Web3)\n\n` +
                `Need a quote? Reply with *4* to book a call.`);
            break;

        case '3': // Resume (Rich Media)
            await msg.reply('📄 *Sending Resume...* Please wait.');

            // Path to resume file (Ensure this file exists in public/ or data/)
            // For now, we'll use a placeholder or check if file exists
            try {
                // const media = MessageMedia.fromFilePath('./public/resume.pdf');
                // await client.sendMessage(msg.from, media);
                await msg.reply('🔗 *Download Resume:* https://khateeb.dev/resume');
            } catch (err) {
                console.error('Error sending resume:', err);
                await msg.reply('⚠️ Error retrieving file. Please view online: https://khateeb.dev/resume');
            }
            break;

        case '4': // Book Call
            await msg.reply(`📅 *Let's Talk Business*\n\n` +
                `Schedule a free 15-minute strategy call here:\n` +
                `🔗 https://calendly.com/khateeb/strategy-call`);
            break;

        default:
            // Optional: Default response for unknown commands if triggered
            // await msg.reply("I didn't understand that. Reply 'menu' to see options.");
            break;
    }
});

function initialize(socketIo) {
    io = socketIo;
    client.initialize();
}

module.exports = { initialize, client };
