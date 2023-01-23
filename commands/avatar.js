const Discord = require("discord.js");

module.exports = {
	name: 'pp',
	description: 'You get the avatar of the user.',
	aliases: ['avatar'],
	usage: 'pp @User',
    cooldown: 5,
    /**@param {Discord.Message} messageCreate
     * @param {Array} args
     * @param {Discord.Client} client
     */
	execute(message, args, client) {
        
        let member = message.mentions.members.first()
        let embed = new Discord.MessageEmbed()

        if(member){
            embed.setTitle(`**${member.user.username}** Kullanıcısının avatarı:`).setImage(member.user.avatarURL({dynamic: true}))
        }else{
            embed.setTitle("**İşte Profil resmin:**").setImage(message.author.avatarURL({dynamic: true}))
        }
        message.channel.send({embeds: [embed]})
	},
};