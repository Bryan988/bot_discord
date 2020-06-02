const Discord = require('discord.js');

module.exports = {
    name: 'rank',
    description: 'get top 3 on the list',
    execute(message, args) {
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(message.author.username)
            .setThumbnail(message.author.displayAvatarURL())
            .setTimestamp()
            .setFooter('a little more and the top is yours !');
        message.channel.send(exampleEmbed);
    },
};