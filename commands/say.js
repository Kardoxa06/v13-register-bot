const Discord = require("discord.js");
const db = require("croxydb");
const ayarlar = require("../config.json");
const moment = require("moment");
moment.locale("tr");
const { MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
	name: 'say',
	description: 'say.',
	aliases: ['say'],
	usage: 'say',
    cooldown: 5,
    /**@param {Discord.Message} messageCreate
     * @param {Array} args
     * @param {Discord.Client} client
     */
	execute(message, args, client, guild) {
        const cross = db.fetch("cross")
       const cross2 = db.fetch("cross2")
       const mark = db.fetch("mark")
       const crown = db.fetch("crown")
       ////////////////////////////////////////////////////
       if(!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(ayarlar.yetkili) ){
        message.channel.send(`${cross} ${message.author} İşlemi gerçekleştirmek için gerekli yetkiye sahip değilsin!`)
        message.react(cross2)
        return
      }
      //////////////////////////////////////////////////////
      let Tag = ayarlar.tag
      let tag =  message.guild.members.cache.filter(member => member.user.username.includes(Tag)).size;
      let voiceMembers = message.guild.members.cache.filter(member => member.voice.channel && !member.user.bot).size.toString();
      let botMembers = message.guild.members.cache.filter(member => member.user.bot && member.voice.channel).size.toString();
      const kardoxam = new Discord.MessageEmbed()
      .setTitle(`${message.guild.name} Sunucusunun bilgileri;`)
      .setDescription(`\`❯\` Şu anda toplam **${voiceMembers}** kişi (**${botMembers} Bot**) seslide.
      \`❯\` Sunucuda **${message.guild.memberCount}** adet üye var.
      \`❯\` Toplamda **${tag}** kişi tagımızı alarak ailemize katılmış.
      \`❯\` Toplamda **${message.guild.premiumSubscriptionCount}** adet boost basılmış! (**${message.guild.premiumTier || "0"}**. seviye)
      `)
      .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true, size: 2048 }))
   .setColor("RANDOM")
   .setFooter(ayarlar.footer)
      message.reply({ embeds: [kardoxam]})

        },
};