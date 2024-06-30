/* ------------------------------------------------------------------------------------ */

const { Client, Events, GatewayIntentBits, Partials, Message, SlashCommandBuilder } = require("discord.js")
const Config = require("./config.json")

/* ------------------------------------------------------------------------------------ */

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessageReactions
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
})

/* ------------------------------------------------------------------------------------ */

client.on(Events.MessageReactionAdd, async function(reaction, user) {
	if (reaction.partial) {
		try {
			await reaction.fetch()
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error)
			return
		}
	}

    Config.reactionRoles.forEach(async function(item) {
        if (reaction.message.id == item.messageId && reaction.emoji.name === item.emoji) {
            
            try {
                const guild = reaction.message.guild;
                const member = await guild.members.fetch(user.id);
    
                if (member) {
                    await member.roles.add(item.roleId);
                    console.log(`Ruolo assegnato a ${user.tag}`);
                } else {
                    console.log(`Impossibile trovare il membro per l'utente ${user.tag}`);
                }
            } catch (error) {
                console.error(`Errore nell'assegnare il ruolo: ${error}`);
            }
        }
    })
})

client.on(Events.MessageReactionRemove, async function(reaction, user) {
	if (reaction.partial) {
		try {
			await reaction.fetch()
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error)
			return
		}
	}

    Config.reactionRoles.forEach(async function(item) {
        if (reaction.message.id == item.messageId && reaction.emoji.name === item.emoji) {
            
            try {
                const guild = reaction.message.guild;
                const member = await guild.members.fetch(user.id);
    
                if (member) {
                    await member.roles.remove(item.roleId);
                    console.log(`Ruolo rimosso a ${user.tag}`);
                } else {
                    console.log(`Impossibile trovare il membro per l'utente ${user.tag}`);
                }
            } catch (error) {
                console.error(`Errore nella rimozione del ruolo: ${error}`);
            }
        }
    })
})

/* ------------------------------------------------------------------------------------ */


/* ------------------------------------------------------------------------------------ */

client.once(Events.ClientReady, function(ready) {
	console.log(`Logged in as ${ready.user.tag}`)
})

client.login(token)