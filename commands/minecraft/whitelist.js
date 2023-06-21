const { SlashCommandBuilder} = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { Rcon } = require('rcon-client');
const config = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('whitelist')
        .setDescription('füge einen Spieler auf die Whitelist')
        .addStringOption(option =>
            option
                .setName('name')
                .setDescription('Setze den Spielername auf die Whitelist')
                .setRequired(true)),

    // Schicke dem User eine Nachricht das er weiß das seine Anfrage bearbeitet wird
    async execute(interaction) {
        const name = interaction.options.getString('name');
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`⌛ füge ${name} auf die Whitelist hinzu..`)
            .setDescription('Bitte habe einen kleinen Moment geduld. Ich werde dich nun whitelisten 😊👍')

        await interaction.reply({ embeds: [embed] })

    // Füge Minecraft Account auf die Whitelist
        const rcon = await Rcon.connect({
            host: config.minecraftRconHost,
            port: config.minecraftRconPort,
            password: config.minecraftRconPassword,
        });


        console.log(`[+] ${name} -- Whitelist ADD`);
        await rcon.send(`whitelist add ${name}`);
        await rcon.send(`say ${name} wurde auf die Whitelist hinzugefügt!`);
        await rcon.end();

    }
}