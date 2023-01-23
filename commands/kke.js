const Discord = require("discord.js");
const db = require("croxydb");
const ayarlar = require("../config.json");
const moment = require("moment");
moment.locale("tr");
const { MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
	name: 'kke',
	description: 'kke gör.',
	aliases: ['kayıtcısı','kayıtcı'],
	usage: 'kayıtcı @user',
    cooldown: 5,
    /**@param {Discord.Message} messageCreate
     * @param {Array} args
     * @param {Discord.Client} client
     */
	execute(message, args, client) {
        var member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author
        const cross = db.fetch(`cross2`)
    const mark = db.fetch(`mark2`)
    const warn = db.fetch(`web`)
        ////
        const row = new MessageActionRow()
        .addComponents(
                new MessageButton()
                .setCustomId('ONAY')
                .setLabel('Onayla')
                .setStyle('PRIMARY'),
                new MessageButton()
                .setCustomId('CANCEL')
                .setLabel('İptal')
                .setStyle('DANGER'),
                );
        ////  


    ////////////////////////////////////////////////////////////////
    if(!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(ayarlar.yetkili)){
        message.channel.send(`${cross} ${message.author} İşlemi gerçekleştirmek için gerekli yetkiye sahip değilsin!`)
        message.react(cross2)
        return
      }
    ////////////////////////////////////////////////////////////////
    if(args[0] === "sıfırla"){
        var uye = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
        if(!uye){
            message.reply("Bir üye belirtmelisin.")
        }
        if(!message.member.permissions.has("ADMINISTRATOR")){
            message.channel.send(`${cross} ${message.author} İşlemi gerçekleştirmek için gerekli yetkiye sahip değilsin!`)
            message.react(cross2)
            return
          }
        message.channel.send({content: `${uye} kullanıcısının kke verisini sıfırlama işlemini onaylıyormusunuz!`, components: [row]})
        
        const filter = i => i.user.id === message.author.id


    const collector = message.channel.createMessageComponentCollector({ filter, time: 50000 });

      collector.on("collect", async i => {

        
if(i.customId === "ONAY") {
    db.delete(`kayıtcı_${member.id}`)
    await i.deferUpdate();
i.editReply({ components: [], content: `${mark} ${uye} kullanıcısının kke verisi başarıyla temizlendi!`})




}
if(i.customId === "CANCEL") {
    await i.deferUpdate();
i.editReply({ components: [], content: `${cross} İşlem iptal edildi!`})




}
})
return
    }
    const isimler = db.get(`kayıtcı_${member.id}`) 
    if(!isimler){
        message.channel.send(`${warn} ${member} Kullanıcının kke verisi bulunamadı.`)
        return;
    }
    message.channel.send(`${member} Kullanıcısını kayıtçı listesi: \n${isimler.join("\n")}`)
	},
};