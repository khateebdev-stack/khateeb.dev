require('dotenv').config();
require('dotenv').config({ path: '.env.local' });
const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const commands = [
    new SlashCommandBuilder()
        .setName('meet')
        .setDescription('Send a Google Meet link to the client'),
    new SlashCommandBuilder()
        .setName('invoice')
        .setDescription('Send an invoice/payment link')
        .addStringOption(option =>
            option.setName('amount')
                .setDescription('Amount to charge (e.g. 500)')
                .setRequired(true)),
    new SlashCommandBuilder()
        .setName('ticket')
        .setDescription('Archive this chat and save as a ticket'),
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log(`Started refreshing application (/) commands for Guild: ${process.env.DISCORD_GUILD_ID}`);

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.DISCORD_CLIENT_ID || process.env.DISCORD_TOKEN.split('.')[0],
                process.env.DISCORD_GUILD_ID
            ),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();
