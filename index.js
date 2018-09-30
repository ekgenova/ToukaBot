const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const math = require('mathjs')
const Chance = require('chance');
const Probabily = require('probability-js');


const client = new Discord.Client();
const config = require("./config.json");
client.config = config;

client.logger = require("./modules/Logger");

client.exp = new Enmap({name: "exp"});
client.credit = new Enmap({name: "credit"});
client.claims = new Enmap({name: "claims"});
client.newclaim = new Enmap({name: "newclaim"});
client.bets = new Enmap({name: "bets"});
client.trivia = new Enmap({name: "trivia"});


fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {

    if (!file.endsWith(".js")) return;

    const event = require(`./events/${file}`);

    let eventName = file.split(".")[0];

    client.on(eventName,event.bind(null,client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    // Load the command file itself
    let props = require(`./commands/${file}`);
    // Get just the command name from the file name
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    // Here we simply store the whole thing in the command Enmap. We're not running it right now.
    client.commands.set(commandName, props);
  });
});

client.login(process.env.token);
