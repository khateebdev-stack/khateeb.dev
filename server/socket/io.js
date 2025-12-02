const { sendToDiscord, fetchHistory, getAdminStatus } = require('../discord/bot');
const chatLogger = require('../storage/chat-logger');

function initialize(io) {
    io.on('connection', (socket) => {
        // Extract real IP (handle proxies, localhost)
        let ip = socket.handshake.headers['x-forwarded-for'] ||
            socket.handshake.headers['x-real-ip'] ||
            socket.handshake.address;

        // Clean IPv6 prefix and localhost
        ip = ip.replace('::ffff:', '');
        if (ip === '::1' || ip === '127.0.0.1') {
            ip = 'localhost';
        }

        const sessionId = socket.handshake.auth.sessionId || socket.id; // Use persistent ID if available
        const userInfo = socket.handshake.auth.userInfo || {}; // User details from lead capture

        // CRITICAL: Join the room named after the Session ID so we can message it later
        socket.join(sessionId);

        console.log(`A user connected: ${sessionId} (Socket: ${socket.id}) from ${ip}`);
        if (userInfo.name) {
            console.log(`[Socket] User info: ${userInfo.name} (${userInfo.email || 'no email'})`);
        }

        // Check admin status and start logging if offline
        const adminStatus = getAdminStatus();
        if (adminStatus === 'offline' || adminStatus === 'dnd') {
            chatLogger.startLog(sessionId, userInfo, ip);
            console.log(`[ChatLogger] Started logging for ${sessionId} (admin offline)`);
        }

        // Sync History from Discord
        fetchHistory(sessionId).then(history => {
            if (history && history.length > 0) {
                console.log(`[Socket] Syncing ${history.length} messages to ${sessionId}`);
                socket.emit('history_sync', history);
            }
        });

        // Send Initial Admin Status
        console.log(`[Socket] Sending initial admin status: ${adminStatus}`);
        socket.emit('admin_status', adminStatus);

        socket.on('chat_message', (msg) => {
            console.log(`[Socket] Message from ${sessionId}: ${msg}`);

            // Log message if admin offline
            if (chatLogger.isLogging(sessionId)) {
                chatLogger.addMessage(sessionId, {
                    text: msg,
                    sender: 'user',
                    userInfo
                });
            }

            // Forward to Discord Bot using Session ID with user info
            sendToDiscord(sessionId, msg, ip, null, null, userInfo);

            // Send Acknowledgement back to client
            socket.emit('message_sent', { id: Date.now() });
        });

        socket.on('file_upload', (data) => {
            // data: { name: 'image.png', buffer: <Buffer> }
            const size = data.buffer ? data.buffer.length : 0;
            console.log(`[Socket] File from ${sessionId}: ${data.name} (Size: ${size} bytes)`);

            // Log file if admin offline
            if (chatLogger.isLogging(sessionId)) {
                chatLogger.addMessage(sessionId, {
                    type: 'file',
                    fileName: data.name,
                    sender: 'user',
                    userInfo
                });
            }

            sendToDiscord(sessionId, `[FILE] ${data.name}`, ip, data.buffer, data.name, userInfo);
        });

        socket.on('disconnect', () => {
            console.log(`[Socket] User disconnected: ${sessionId}`);

            // Save chat log if it exists
            if (chatLogger.isLogging(sessionId)) {
                chatLogger.saveLog(sessionId);
            }
        });
    });
}

module.exports = { initialize };
