const Discord = require('discord.js');

module.exports = {
    name: 'farm',
    cooldown:10,
    description: 'farm xp',
    execute(message, args) {
        message.channel.send("You just earn no xp cuz not implemented yet lol");
    },
};