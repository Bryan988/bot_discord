const Discord = require('discord.js');
const Xp=require('../database/xp');

module.exports = {
    name: 'farm',
    cooldown: 10,
    description: 'farm xp',
     execute(message, args) {
        let xp = Math.floor(Math.random() * (100 - 50) + 50);
        try{
             Xp.farm(message.author.id,message.author.username,xp);
             message.channel.send("You just earned " + xp + " xp");
        }
        catch (e) {
            console.error(e);
             message.channel.send("error while farming")
        }

    },
};