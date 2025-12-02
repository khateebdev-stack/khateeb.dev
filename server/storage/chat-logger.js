const fs = require('fs');
const path = require('path');

const logsDir = path.join(__dirname, '../storage/logs');

// Ensure logs directory exists
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

class ChatLogger {
    constructor() {
        this.activeLogs = new Map(); // sessionId -> log data
    }

    // Start logging for a session (when admin is offline)
    startLog(sessionId, userInfo, ip) {
        const log = {
            sessionId,
            userInfo: userInfo || {},
            ip,
            startTime: new Date().toISOString(),
            messages: [],
            adminStatus: 'offline'
        };

        this.activeLogs.set(sessionId, log);
        console.log(`[ChatLogger] Started logging session: ${sessionId}`);
    }

    // Add message to log
    addMessage(sessionId, message) {
        const log = this.activeLogs.get(sessionId);
        if (log) {
            log.messages.push({
                ...message,
                timestamp: new Date().toISOString()
            });
        }
    }

    // Save log to file and clear from memory
    saveLog(sessionId) {
        const log = this.activeLogs.get(sessionId);
        if (!log) return;

        log.endTime = new Date().toISOString();

        const filename = `${sessionId}_${new Date().toISOString().replace(/:/g, '-')}.json`;
        const filepath = path.join(logsDir, filename);

        fs.writeFileSync(filepath, JSON.stringify(log, null, 2), 'utf8');
        console.log(`[ChatLogger] Saved log: ${filename}`);

        this.activeLogs.delete(sessionId);
    }

    // Check if session is being logged
    isLogging(sessionId) {
        return this.activeLogs.has(sessionId);
    }

    // Get unsent logs (logs that haven't been sent to admin yet)
    getUnsentLogs() {
        const files = fs.readdirSync(logsDir).filter(f => f.endsWith('.json'));
        const unsentLogs = [];

        files.forEach(file => {
            try {
                const filepath = path.join(logsDir, file);
                const content = fs.readFileSync(filepath, 'utf8');

                // Skip empty files
                if (!content || content.trim() === '') {
                    console.log(`[ChatLogger] Skipping empty log file: ${file}`);
                    return;
                }

                const log = JSON.parse(content);

                // Check if log has NOT been sent to admin
                if (!log.sentToAdmin) {
                    unsentLogs.push({ ...log, filename: file, filepath });
                }
            } catch (error) {
                console.error(`[ChatLogger] Error reading log file ${file}:`, error.message);
                // Skip corrupted files, don't crash
            }
        });

        return unsentLogs;
    }

    // Mark log as sent to admin
    markAsSent(filename) {
        const filepath = path.join(logsDir, filename);
        if (fs.existsSync(filepath)) {
            const content = fs.readFileSync(filepath, 'utf8');
            const log = JSON.parse(content);
            log.sentToAdmin = true;
            log.sentAt = new Date().toISOString();
            fs.writeFileSync(filepath, JSON.stringify(log, null, 2), 'utf8');
            console.log(`[ChatLogger] Marked log as sent: ${filename}`);
        }
    }

    // Get all saved logs
    getAllLogs() {
        const files = fs.readdirSync(logsDir).filter(f => f.endsWith('.json'));
        return files.map(file => {
            const content = fs.readFileSync(path.join(logsDir, file), 'utf8');
            return JSON.parse(content);
        });
    }
}

const logger = new ChatLogger();

module.exports = logger;
