const { Client, Events, GatewayIntentBits } = require("discord.js")
const { token } = require("./token.json")

const client = new Client({ intents: [
    GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
]})

client.once(Events.ClientReady, function(ready) {
	console.log(`Ready! Logged in as ${ready.user.tag}`);
})

client.login(token)

client.on("messageCreate", async function(msg) {
    console.log(msg)
})