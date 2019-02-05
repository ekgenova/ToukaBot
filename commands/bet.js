exports.run = (client,message,args) => {

    const key = `${message.guild.id}-${message.author.id}`;

    let polyToUse = parseInt(args[0]);
    let betChoice = args[1];
    let currPoly = client.credit.get(key, "poly");
    if (!polyToUse) return message.reply('You didn\`t tell me how much <:poly:485948194652553216> to bet!');
    if (!betChoice) return message.reply('You didn\`t tell me your choice! Heads or tails~?');
    if (!(betChoice === "heads" || betChoice === "tails")) return message.reply("Heads or tails only! No cheating~ ^^");
    if (currPoly < polyToUse) return message.reply("You don't have enough <:poly:485948194652553216> to make that bet! :(");

    let flipped = coinFlip();

    if (betChoice.toLowerCase() === flipped ){
        let updatedPoly = currPoly + (2*polyToUse);

        let currBetWins = client.bets.get(key, "totalWins");
        let currHTWins = client.bets.get(key, "HTWins");
        let newBetWins = currBetWins + polyToUse;
        let newHTWins = currHTWins + polyToUse;

        client.credit.set(key, updatedPoly, "poly");
        client.bets.set(key, newBetWins, "totalWins");
        client.bets.set(key, newHTWins, "HTWins");

        return message.reply('The coin fell on ' + flipped + '- you WIN ' + 2*polyToUse + '<:poly:485948194652553216>! Well done~');
    }
    else {
        let updatedPoly = currPoly - polyToUse;
        client.credit.set(key, updatedPoly, "poly");

        return message.reply('The coin fell on ' + flipped + '-you LOSE ' + polyToUse + '<:poly:485948194652553216>...');
    }

    function coinFlip() {
        return (Math.floor(Math.random() * 2) === 0) ? 'heads' : 'tails';
    }

}