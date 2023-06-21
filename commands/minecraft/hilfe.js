const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hilfe')
        .setDescription('ich helfe dir dich zu whitelisten'),
    async execute(interaction) {
        await interaction.reply('Verwende /whitelist und schreibe mir dein Minecraft Name um dich zu whitelisten 😊👍');
    },
};