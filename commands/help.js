exports.run = (client,message,args) => {

    if (args.length === 0){
        return message.channel.send("__Welcome to the help section!__\nTouka Bot is a fun bot designed for users who play the mobile game Crash Fever. " +
            "The bot includes personal levelling, claiming characters, leaderboards, CF games and other games. Below you will see a list of all commands available." +
            "Examples for some of the commands will also be provided. For further information on a specific command use 't.help [the command name]'" +
            "For example, t.help trivia. \n **__Commands:__**\n**t.daily** - claim <:poly:486028147821641740> every 8 hours" +
            "\n**t.profile** - displays your personal profile\n**t.gift** - gift a user <:poly:486028147821641740>. For example, t.gift @Kate 10." +
            "\n**t.leaderboard** - displays top 10 members for exp/claims/poly (spent). For example, t.leaderboard exp." +
            "\n**t.bet** - bet <:poly:486028147821641740> on heads/tails\n**t.wink** - sends the Stokes wink gif" +
            "\n**t.claim** - claim a unit as Waifu/Husbando by giving them <:poly:486028147821641740>. For example, t.claim Pascal 100." +
            "\n**t.roll** - Roll a hatcher. Are you lucky enough to get a fes? Options: Featured modifier (Default: %3.5), Number of eggs (Default: 10), Guaranteed with gr (Guaranteed 5*), gf (Guaranteed featured) (Default: none)" +
            "\n**t.ask** - ask Touka's magic 8 ball a question\n**t.trivia** - play Crash fever related quiz games. Options: next (asks new questions), mode (changes game mode), diff (changes difficulty). \n" +
            "Game modes: 0 - Random, 1 - Crash Fever: Trivia, 2 - Guess Who?, 3 - Who has that title?\nDifficulties: Random, Easy, Medium, Hard\n" +
            "Additionally, there are a few admin only commands which are not described here that are not relevant to general usage.")
    }

}