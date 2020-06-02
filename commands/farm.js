const Discord = require('discord.js');
const Xp=require('../database/xp');

module.exports = {
    name: 'farm',
    cooldown: 10,
    description: 'farm xp',
    async execute(message, args) {
        let xp = Math.floor(Math.random() * (100 - 50) + 50);
        try{
             await Xp.farm(message.author.id,message.author.username,xp);
             await message.channel.send("You just earned " + xp + " xp");
        }
        catch (e) {
            console.error(e);
            await message.channel.send("error while farming")
        }

    },
};