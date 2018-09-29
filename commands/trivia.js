const Discord = require("discord.js");
const trivia = require("../persistence/trivia");

exports.run = (client,message,args) => {

    const key = `${message.guild.id}-${message.author.id}`;

    if (args[0] === "mode") {
        changeMode(args[1]);
    }

    function changeMode(mode){
        modeKeys = ["0", "1", "2", "3"];
        modes = ["Random", "Trivia: General", "Guess Who?", "Who has that title?"];
        let currMode = parseInt(client.trivia.get(key, "mode"));

        if (mode === currMode){
            return message.reply(`You are already playing ` + `${modes[mode]}` + '!');
        } else if (!modeKeys.includes(mode)){
            return message.reply("There's no such game mode! Try t.help trivia for more info!");
        } else {
            client.trivia.set(key, parseInt(mode), "mode");
            return message.reply(`You've switched to ` + `${modes[mode]}` + `!`);
        }
    }

}