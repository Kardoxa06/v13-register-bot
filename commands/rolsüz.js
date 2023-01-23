const Discord = require("discord.js");
const db = require("croxydb");
const ayarlar = require("../config.json");
const moment = require("moment");
moment.locale("tr");
const { MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
	name: 'rolsüz',
	description: 'rolsüz ver.',
	aliases: ['rolsüz'],
	usage: 'rolsüz',
    cooldown: 5,
    /**@param {Discord.Message} messageCreate
     * @param {Array} args
     * @param {Discord.Client} client
     */
	execute(message, args, client) {
         ////////////////////////////////////////////////////
       if(!message.member.permissions.has("ADMINISTRATOR")){
        message.channel.send(`${cross} ${message.author} İşlemi gerçekleştirmek için gerekli yetkiye sahip değilsin!`)
        message.react(cross2)
        return
      }
      //////////////////////////////////////////////////////
      const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('v')
					.setLabel('Ver')
					.setStyle('SUCCESS'),
            );
            let user = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)
            const use = new Discord.MessageEmbed()
            .setAuthor("" + message.author.username + " ", message.author.avatarURL())
            .setColor("RANDOM")
            .setFooter(`${ayarlar.footer}`, message.guild.iconURL())
            .setDescription("Sunucumuzda rolü olmayan \`" + user.size + "\` kişi var. Bu kişilere üye rolü vermek için alternatif butonu kullanabilirsiniz!")
            message.reply({embeds: [use], components: [row]})
        
	
        const filter = i => i.user.id === message.author.id


    const collector = message.channel.createMessageComponentCollector({ filter, time: 50000 });

      collector.on("collect", async i => {

        
if(i.customId === "v") {
    const info = new Discord.MessageEmbed()
    .setAuthor(" " + message.author.username + " ", message.author.avatarURL())
    .setColor("RANDOM")
    .setFooter(`${ayarlar.footer}`, message.guild.iconURL())
    .setDescription(`Sunucumuzda rolü olmayan " **` + user.size + `** " kişiye kayıtsız(<@&${ayarlar.unreg}>) rolü verildi!`)
    user.forEach(r => {
        r.roles.add(ayarlar.unreg)
    })
    await i.deferUpdate();
i.editReply({ components: [], embeds: [info]})


      }
    })
    
    },
};