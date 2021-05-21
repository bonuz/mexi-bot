const Discord = require("discord.js");
const config = require("./config.json");
const ytdl = require('ytdl-core');

const client = new Discord.Client();
const prefix = "!";
const channelCode = "608447650316156939";
const mexiId = "608455853539852289";
client.login(config.BOT_TOKEN);

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */

client.on('ready', () => {
    console.log('I am ready!');
});

client.on("ready", () => {
    const channel = client.channels.cache.get(channelCode);
    if (!channel) return console.error("The channel does not exist!");
    channel.join().then(connection => {
        // Yay, it worked!
        console.log("Successfully connected.");
    }).catch(e => {
        // Oh no, it errored! Let's log it to console :)
        console.error(e);
    });
});

client.on('voiceStateUpdate', (oldState, newState) =>{
    // check for bot
    if (oldState.member.user.bot) return;
    // if (newState.channelID === null) console.log('user left channel', oldState.channelID);
    // else if (oldState.channelID === null) console.log('user joined channel', newState.channelID);
    // else console.log('user moved channels', oldState.channelID, newState.channelID);

    console.log('id: ', newState.id);
    //console.log(newState);
    
    if (newState.channelID === channelCode && newState.id === mexiId) {
        Amateur();
    }
});

client.on("message", function(message){
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
    else if (command === "mexican") {
        Amateur();
    }
});

function Amateur(){
    const broadcast = client.voice.createBroadcast();
    broadcast.play('amateur.mp3');
    //broadcast.play(ytdl('https://www.youtube.com/watch?v=Pke3A2XuBLg', { filter: 'audioonly', }));
    // Play "music.mp3" in all voice connections that the client is in
    for (const connection of client.voice.connections.values()) {
        connection.play(broadcast);
    }
}