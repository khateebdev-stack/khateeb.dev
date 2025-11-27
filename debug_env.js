const fs = require('fs');
const path = require('path');

console.log('--- Environment Debugger ---');
console.log('Current Directory:', process.cwd());

const envPath = path.join(process.cwd(), '.env');
const envLocalPath = path.join(process.cwd(), '.env.local');

console.log('Checking .env file exists:', fs.existsSync(envPath));
console.log('Checking .env.local file exists:', fs.existsSync(envLocalPath));

require('dotenv').config();
require('dotenv').config({ path: '.env.local' });

console.log('\n--- Loaded Variables ---');
console.log('DISCORD_TOKEN:', process.env.DISCORD_TOKEN ? 'FOUND (Length: ' + process.env.DISCORD_TOKEN.length + ')' : 'MISSING');
console.log('DISCORD_CHANNEL_ID:', process.env.DISCORD_CHANNEL_ID ? 'FOUND' : 'MISSING');
console.log('DISCORD_GUILD_ID:', process.env.DISCORD_GUILD_ID ? 'FOUND' : 'MISSING');
console.log('------------------------');
