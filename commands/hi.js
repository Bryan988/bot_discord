const Discord = require('discord.js');

module.exports = {
    name: 'hi',
    description: 'Say Hello!',
    execute(message, args) {
        message.channel.send('Hello '+message.author.username);
    },
};