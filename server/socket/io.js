const { sendToDiscord, fetchHistory, getAdminStatus } = require('../discord/bot');

function initialize(io) {
    io.on('connection', (socket) => {
        const ip = socket.handshake.address.replace('::ffff:', ''); // Clean IPv6 prefix
        const sessionId = socket.handshake.auth.sessionId || socket.id; // Use persistent ID if available

        // CRITICAL: Join the room named after the Session ID so we can message it later
        socket.join(sessionId);

        console.log(`A user connected: ${sessionId} (Socket: ${socket.id}) from ${ip}`);

        // Sync History from Discord
        fetchHistory(sessionId).then(history => {
            if (history && history.length > 0) {
                console.log(`[Socket] Syncing ${history.length} messages to ${sessionId}`);
                socket.emit('history_sync', history);
            }
        });

        // Send Initial Admin Status
        const status = getAdminStatus();
        console.log(`[Socket] Sending initial admin status: ${status}`);
        socket.emit('admin_status', status);

        socket.on('chat_message', (msg) => {
            console.log(`[Socket] Message from ${sessionId}: ${msg}`);
            // Forward to Discord Bot using Session ID
            sendToDiscord(sessionId, msg, ip);
            // Send Acknowledgement back to client
            socket.emit('message_sent', { id: Date.now() });
        });

        socket.on('file_upload', (data) => {
            // data: { name: 'image.png', buffer: <Buffer> }
            console.log(`[Socket] File from ${sessionId}: ${data.name}`);
            sendToDiscord(sessionId, `[FILE] ${data.name}`, ip, data.buffer);
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
}

module.exports = { initialize };
