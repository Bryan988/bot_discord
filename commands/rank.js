const Discord = require('discord.js');
const Xp = require('../database/xp');
const Bar=require('../functions/progressBar');
module.exports = {
    name: 'rank',
    description: 'get top 3 on the list',
    async execute(message, args) {
        //get the rank
        try{
            let obj=await Xp.getRank(message.author.id);
            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(message.author.username)
                .setThumbnail(message.author.displayAvatarURL())
                .setTimestamp()
                .addFields(
                    {name:'Rank',value:'#'+obj.rank,inline:true},
                    {name:'Level',value:obj.level,inline:true},
                    {name:'Experience',value:obj.realxp+"/"+obj.basexp}
                )
                .setFooter('a little more and the top is yours !');

            message.channel.send(exampleEmbed);
        }
        catch (e) {
            message.reply("you didn't farm yet");
            console.error(e);

        }

        //get the level
        //get the current xp
        //get max xp to up

    },
};