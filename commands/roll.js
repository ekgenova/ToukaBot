function rollEgg(guaranteedRainbow, fesPercentage) {
    var randomEgg = Math.random() * 100 + 1

    if (randomEgg >= fesPercentage && fesPercentage != 0)
        return ":tada:"
    else if (randomEgg < fesPercentage && randomEgg >= fesPercentage - 13 || guaranteedRainbow)
        return "<:eggRainbow:495984241973395456>"
    else
        return "<:eggGolden:495984241461559308>"
}

exports.run = (client,message) => {
    //Setup default options
    var rollTries = 10
    var fesPercentage = 96.5 //Average hatcher featured percentage
    var guaranteed

    var rollResult = ""

    //Get a local copy of the message's content
    content = message.content.replace(prefix + "roll", "")

    //Get options
    while (content != "") {
        var option;
        if (content.charAt(0) == " ")
            content = content.slice(1, content.length)

        if (content.indexOf(" ") != -1)
            option = content.substr(0, content.indexOf(" "))
        else
            option = content

        if (option.includes("%"))
            fesPercentage = 100 - option.replace("%", "")
        else if (option.includes("gr") || option.includes("gf"))
            guaranteed = option
        else if(!isNaN(option))
            rollTries = option

        content = content.slice(option.length, content.length)
    }

    //Get roll results
    if (isNaN(rollTries)) {
        message.channel.sendMessage("Please type t.roll [#][%][gr or gf] to use this command.")
    } else if (rollTries > 10 || rollTries < 1) {
        message.channel.sendMessage("I can only roll 1 to 10 times at a time.")
    } else {
        if (guaranteed == "gf")
            rollResult += ":tada:"
        else if (guaranteed == "gr") 
            rollResult += rollEgg(true, fesPercentage)		   

        for (var i = guaranteed ? 1 : 0; i < rollTries; ++i) {
            rollResult += rollEgg(false, fesPercentage)
            if (i == 4)
                rollResult += "\n"
        }
    
        message.contentchannel.sendMessage(rollResult)
    }    
}