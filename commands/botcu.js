const Discord = require("discord.js");
const db = require("croxydb");
const conf = require("../config.json")
module.exports = {
	name: 'botcu',
	description: 'Botcuyu gör.',
	aliases: ['developer'],
	usage: 'botcu',
    cooldown: 5,
    /**@param {Discord.Message} messageCreate
     * @param {Array} args
     * @param {Discord.Client} client
     */
	execute(message, args, client) {
        
        const developer = db.fetch(`developer`)
        message.react(developer) 
        message.channel.send(`${developer} Developer: <@!${conf.owner}> **(${conf.owner})**`)
	},
};