const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();

const prefix = "!";

client.login(config.BOT_TOKEN);

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
 client.on('ready', () => {
    console.log('I am ready!');
  });


client.on('voiceStateUpdate', (oldState, newState) =>{
    // check for bot
    if (oldState.member.user.bot) return;
    if (newState.channelID === null) console.log('user left channel', oldState.channelID);
    else if (oldState.channelID === null) console.log('user joined channel', newState.channelID);
    else console.log('user moved channels', oldState.channelID, newState.channelID);

    console.log(newState);
});

client.on("message", function(message){
    // if (message.content === 'what is my avatar') {
    //     // Send the user's avatar URL
    //     message.reply(message.author.displayAvatarURL());
    //   }

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command === "ping"){
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Pong! papa!! This message had a latency of ${timeTaken}ms.`);
    }
    else if (command === "sum") {
        const numArgs = args.map(x => parseFloat(x));
        const sum = numArgs.reduce((counter, x) => counter += x);
        message.reply(`The sum of all the arguments you provided is ${sum}!`);
    }
});

