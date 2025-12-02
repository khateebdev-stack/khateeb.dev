const { Client, GatewayIntentBits, EmbedBuilder, ChannelType } = require('discord.js');
const { findAnswer } = require('../chatbot/logic');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences,
    ]
});

let io;
const GUILD_ID = process.env.DISCORD_GUILD_ID;
const CHANNEL_ID = process.env.DISCORD_CHANNEL_ID; // Main channel for tickets

// Store active sessions: { socketId: threadId } and { threadId: socketId }
// Store active sessions: { socketId: threadId } and { threadId: socketId }
const sessions = new Map();
const threads = new Map();
let cachedAdminStatus = 'offline';

client.once('ready', async () => {
    console.log(`[Discord] Bot is ready as ${client.user.tag}!`);
    recoverThreads();

    // Fetch initial admin status
    try {
        if (GUILD_ID) {
            const guild = client.guilds.cache.get(GUILD_ID);
            if (guild) {
                const members = await guild.members.fetch();
                const admin = members.find(m => !m.user.bot);
                if (admin && admin.presence) {
                    cachedAdminStatus = admin.presence.status;
                    console.log(`[Discord] Initial Admin Status: ${cachedAdminStatus}`);
                }
            }
        }
    } catch (error) {
        console.error('[Discord] Failed to fetch initial admin status:', error);
    }
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    // Check if message is in a thread we are tracking
    if (message.channel.type === ChannelType.PublicThread || message.channel.type === ChannelType.PrivateThread) {
        const socketId = threads.get(message.channel.id);

        if (socketId && io) {
            // Handle Text
            if (message.content) {
                console.log(`[Discord] Forwarding message to ${socketId}: ${message.content}`);
                io.to(socketId).emit('admin_message', {
                    text: message.content,
                    sender: 'Khateeb',
                    timestamp: new Date().toISOString()
                });
            }

            // Handle Attachments (Images/Files)
            if (message.attachments.size > 0) {
                message.attachments.forEach(attachment => {
                    console.log(`[Discord] Forwarding attachment to ${socketId}: ${attachment.url}`);

                    let type = 'file';
                    if (attachment.contentType?.startsWith('image/')) type = 'image';
                    else if (attachment.contentType?.startsWith('audio/')) type = 'audio';
                    else if (attachment.contentType?.startsWith('video/')) type = 'video';

                    io.to(socketId).emit('admin_message', {
                        text: attachment.url,
                        type: type,
                        name: attachment.name,
                        sender: 'Khateeb',
                        timestamp: new Date().toISOString()
                    });
                });
            }
        }
    }
});

// Monitor admin presence and send unsent logs when they come online
client.on('presenceUpdate', async (oldPresence, newPresence) => {
    try {
        // Check if this is the admin (not a bot)
        if (newPresence.user.bot) return;

        const oldStatus = oldPresence?.status || 'offline';
        const newStatus = newPresence.status;

        // Update cached admin status
        cachedAdminStatus = newStatus;

        // Broadcast new status to all connected clients
        if (io) {
            io.emit('admin_status', newStatus);
            console.log(`[Discord] Admin status changed: ${oldStatus} → ${newStatus}`);
        }

        // If admin just came online, send any unsent logs
        if ((oldStatus === 'offline' || oldStatus === 'dnd') && (newStatus === 'online' || newStatus === 'idle')) {
            console.log('[Discord] Admin came online! Checking for unsent logs...');

            // Make sure bot is fully ready
            if (!client.isReady()) {
                console.log('[Discord] Bot not ready yet, skipping log send');
                return;
            }

            const chatLogger = require('../storage/chat-logger');
            const unsentLogs = chatLogger.getUnsentLogs();

            if (unsentLogs.length > 0) {
                console.log(`[Discord] Found ${unsentLogs.length} unsent log(s). Sending to admin...`);

                const channel = await client.channels.fetch(CHANNEL_ID);

                for (const log of unsentLogs) {
                    // Create embed for the log summary
                    const embed = new EmbedBuilder()
                        .setColor(0xFF6B35)
                        .setTitle(`📋 Missed Conversation - ${log.sessionId.substring(0, 8)}`)
                        .setDescription(`Conversation that occurred while you were offline`)
                        .addFields(
                            { name: '👤 Visitor', value: log.userInfo.name || 'Anonymous', inline: true },
                            { name: '📧 Email', value: log.userInfo.email || 'Not provided', inline: true },
                            { name: '📱 Phone', value: log.userInfo.phone || 'Not provided', inline: true },
                            { name: '🌐 IP', value: log.ip || 'Unknown', inline: true },
                            { name: '⏰ Started', value: new Date(log.startTime).toLocaleString(), inline: true },
                            { name: '💬 Messages', value: `${log.messages.length} messages`, inline: true }
                        )
                        .setTimestamp();

                    // Send summary
                    await channel.send({ embeds: [embed] });

                    // Send conversation transcript
                    if (log.messages.length > 0) {
                        let transcript = `**Conversation Transcript:**\n\`\`\`\n`;
                        log.messages.forEach(msg => {
                            const time = new Date(msg.timestamp).toLocaleTimeString();
                            const sender = msg.sender === 'user' ? 'Visitor' : 'Bot';
                            transcript += `[${time}] ${sender}: ${msg.text || msg.fileName || '[File]'}\n`;
                        });
                        transcript += `\`\`\``;

                        await channel.send(transcript);
                    }

                    // Mark as sent
                    chatLogger.markAsSent(log.filename);
                }

                console.log(`[Discord] ✅ Sent ${unsentLogs.length} unsent log(s) to admin`);
            } else {
                console.log('[Discord] No unsent logs found');
            }
        }
    } catch (error) {
        console.error('[Discord] Error in presenceUpdate:', error);
    }
});

// Handle Slash Commands
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;
    const socketId = threads.get(interaction.channelId);

    if (!socketId) {
        await interaction.reply({ content: '❌ This command can only be used in active ticket threads.', ephemeral: true });
        return;
    }

    if (commandName === 'meet') {
        const meetLink = 'https://meet.google.com/new';
        await interaction.reply({ content: `✅ Sent Google Meet link.`, ephemeral: true });
        if (io) io.to(socketId).emit('admin_message', { text: `📞 **Join me on a call:** [Click here to join](${meetLink})`, sender: 'Khateeb' });
        await interaction.channel.send(`**Admin sent Meeting Link:** ${meetLink}`);
    }
    else if (commandName === 'invoice') {
        const amount = interaction.options.getString('amount');
        const invoiceLink = `https://stripe.com/pay/${amount}`;
        await interaction.reply({ content: `✅ Sent Invoice for $${amount}.`, ephemeral: true });
        if (io) io.to(socketId).emit('admin_message', { text: `💳 **Invoice Generated:** Please pay $${amount} here: [Pay Now](${invoiceLink})`, sender: 'Khateeb' });
        await interaction.channel.send(`**Admin sent Invoice:** $${amount}`);
    }
    else if (commandName === 'ticket') {
        await interaction.reply({ content: '✅ Ticket saved and archived.', ephemeral: true });
        await interaction.channel.setArchived(true);
    }
});

// Forward typing status
client.on('typingStart', (typing) => {
    if (typing.channel.type === ChannelType.PublicThread || typing.channel.type === ChannelType.PrivateThread) {
        const socketId = threads.get(typing.channel.id);
        if (socketId && io) {
            io.to(socketId).emit('admin_typing');
        }
    }
});

// Function to create a new ticket (thread) for a visitor
async function createTicket(socketId, visitorName = 'Visitor', ip = 'Unknown') {
    try {
        if (!CHANNEL_ID) {
            console.error('[Discord] DISCORD_CHANNEL_ID is missing in .env');
            return null;
        }

        const channel = await client.channels.fetch(CHANNEL_ID);
        if (!channel) {
            console.error(`[Discord] Ticket channel ${CHANNEL_ID} not found!`);
            return null;
        }

        // Create a new thread with Session ID in name for recovery
        const thread = await channel.threads.create({
            name: `🔴 Live: ${visitorName} [${socketId}]`,
            autoArchiveDuration: 60,
            reason: 'New Live Chat Session',
        });

        // Store mapping
        sessions.set(socketId, thread.id);
        threads.set(thread.id, socketId);

        // Send initial embed
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('🚀 New Live Chat Session')
            .setDescription(`Visitor **${visitorName}** has started a chat.`)
            .addFields(
                { name: 'Session ID', value: socketId, inline: true },
                { name: 'IP Address', value: ip, inline: true },
                { name: 'Status', value: 'Waiting for reply...', inline: true }
            )
            .setTimestamp();

        await thread.send({ embeds: [embed] });
        console.log(`[Discord] Created thread ${thread.id} for ${socketId}`);
        return thread.id;

    } catch (error) {
        console.error('[Discord] Error creating ticket:', error);
        return null;
    }
}

// Recover active threads on startup
async function recoverThreads() {
    if (!CHANNEL_ID) return;
    try {
        const channel = await client.channels.fetch(CHANNEL_ID);
        if (!channel) return;

        console.log('[Discord] Fetching active threads for recovery...');
        const activeThreads = await channel.threads.fetchActive();

        activeThreads.threads.forEach(thread => {
            console.log(`[Discord] Checking thread: ${thread.name}`);
            // Extract Session ID from name: "🔴 Live: Visitor [sessionId]" OR legacy "🔴 Live: Visitor (sessionId)"
            const match = thread.name.match(/\[(.*?)\]/) || thread.name.match(/\((.*?)\)/);

            if (match && match[1]) {
                const sessionId = match[1];

                // Check if we already have a thread for this session (avoid duplicates)
                if (sessions.has(sessionId)) {
                    console.log(`[Discord] ⚠️ Duplicate thread found for ${sessionId}. Keeping existing: ${sessions.get(sessionId)}, Ignoring: ${thread.id}`);
                } else {
                    sessions.set(sessionId, thread.id);
                    threads.set(thread.id, sessionId);
                    console.log(`[Discord] ✅ Recovered session ${sessionId} -> thread ${thread.id}`);
                }
            } else {
                console.log(`[Discord] ⚠️ Could not parse Session ID from thread: ${thread.name}`);
            }
        });
    } catch (error) {
        console.error('[Discord] Thread recovery failed:', error);
    }
}

// Handle Reactions (Discord -> Website)
client.on('messageReactionAdd', async (reaction, user) => {
    if (user.bot) return;

    // Check if reaction is in a tracked thread
    const socketId = threads.get(reaction.message.channelId);
    if (socketId && io) {
        const emoji = reaction.emoji.name;
        console.log(`[Discord] Forwarding reaction ${emoji} to ${socketId}`);

        // We need to identify WHICH message was reacted to. 
        // Since we don't track message IDs map, we'll just emit the last message reaction for now
        // Or ideally, the frontend should handle "reaction on latest message" if no ID match.
        // For now, we'll emit a generic "admin_reaction" event.
        // });
    }
});

// Fetch chat history from Discord Thread
async function fetchHistory(sessionId) {
    let threadId = sessions.get(sessionId);
    if (!threadId) {
        console.log(`[Discord] No active thread found for history sync: ${sessionId}`);
        return [];
    }

    try {
        const thread = await client.channels.fetch(threadId);
        if (!thread) return [];

        const messages = await thread.messages.fetch({ limit: 50 });
        const history = [];

        return history.reverse();

    } catch (error) {
        console.error('[Discord] Error fetching history:', error);
        return [];
    }
}

// ... (Existing code)

// Function to send visitor message to Discord
async function sendToDiscord(socketId, text, ip, fileBuffer = null, fileName = 'upload.png') {
    console.log(`[Discord] Processing message from ${socketId}: ${text}`);

    // 1. Check Admin Status
    const status = await getAdminStatus();

    // 2. If Admin is Offline/DND, try Smart Reply FIRST
    if (status === 'offline' || status === 'dnd') {
        const smartReply = findAnswer(text);

        if (smartReply) {
            console.log(`[Chatbot] Smart Reply triggered for ${socketId}`);
            if (io) {
                // Simulate typing delay
                io.to(socketId).emit('admin_typing');
                setTimeout(() => {
                    io.to(socketId).emit('admin_message', {
                        text: smartReply.text,
                        sender: 'agent', // Make it look like the agent
                        timestamp: new Date().toISOString(),
                        chips: smartReply.chips
                    });

                    // Log bot response if chat is being logged
                    const chatLogger = require('../storage/chat-logger');
                    if (chatLogger.isLogging(socketId)) {
                        chatLogger.addMessage(socketId, {
                            text: smartReply.text,
                            sender: 'bot',
                            chips: smartReply.chips
                        });
                    }
                }, 1500);
            }
            // Don't create Discord thread for bot replies (avoid spam)
            return;
        }
    }

    // 3. If no Smart Reply (or Admin is Online), forward to Discord
    let threadId = sessions.get(socketId);

    if (!threadId) {
        console.log(`[Discord] No active thread found in memory for ${socketId}. Checking recovery...`);
        console.log(`[Discord] Creating new ticket for ${socketId}...`);
        threadId = await createTicket(socketId, 'Visitor', ip);
    }

    if (threadId) {
        try {
            const thread = await client.channels.fetch(threadId);
            if (thread) {
                if (fileBuffer) {
                    await thread.send({
                        content: `**Visitor:** Sent a file: ${fileName}`,
                        files: [{ attachment: fileBuffer, name: fileName }]
                    });
                } else {
                    await thread.send(`**Visitor:** ${text}`);
                }
                console.log(`[Discord] Message sent to thread ${threadId}`);

                // If Admin is offline and NO smart reply was found, send fallback ONCE per session (logic needed)
                // For now, we just let the message sit there.
            } else {
                console.error(`[Discord] Thread ${threadId} not found!`);
                sessions.delete(socketId);
            }
        } catch (error) {
            console.error('[Discord] Error sending to thread:', error);
            sessions.delete(socketId);
        }
    } else {
        console.error('[Discord] Failed to obtain thread ID. Message dropped.');
    }
}

function initialize(socketIo) {
    io = socketIo;
    if (process.env.DISCORD_TOKEN) {
        client.login(process.env.DISCORD_TOKEN).catch(err => console.error('[Discord] Login Failed:', err));
    } else {
        console.warn('[Discord] No Token provided. Bot will not start.');
    }
}

// Sync Admin Status
client.on('presenceUpdate', (oldPresence, newPresence) => {
    if (!newPresence || !newPresence.user) return;
    if (newPresence.user.bot) return; // Ignore bots

    const status = newPresence.status;
    console.log(`[Discord] Status update for ${newPresence.user.tag}: ${status}`);

    cachedAdminStatus = status;
    if (io) io.emit('admin_status', status);
});

// Get current Admin status (Instant)
function getAdminStatus() {
    return cachedAdminStatus;
}

module.exports = { initialize, client, createTicket, sendToDiscord, fetchHistory, getAdminStatus };
