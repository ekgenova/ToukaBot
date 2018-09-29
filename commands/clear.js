exports.run = (client,message,args) => {
  // Limited to guild owner - adjust to your own preference!
  if (message.author.id !== message.guild.ownerID) return message.reply("Sorry, you can't do that! :(");

  const user = message.mentions.users.first() || client.users.get(args[0]);
  const key = `${message.guild.id}-${user.id}`;
  if(!user) return message.reply("You must mention someone or give their ID!");

  if (args[0] === "all"){
    client.exp.delete(key);
    client.credit.delete(key);
    client.claims.delete(key);
    client.bets.delete(key);
    client.trivia.delete(key);
    return message.channel.send("Deleted all enmaps");
  }
  if (args[0] === "exp"){
    client.exp.delete(key);
    return message.channel.send("Deleted exp enmap");
  }
  if (args[0] === "credit"){
    client.credit.delete(key);
    return message.channel.send("Deleted credit enmap");
  }
  if (args[0] === "claims"){
    client.claims.delete(key);
    return message.channel.send("Deleted claims enmap");
  }
  if (args[0] === "bets"){
    client.bets.delete(key);
    return message.channel.send("Deleted bets enmap");
  }
  if (args[0] === "trivia"){
    client.trivia.delete(key);
    return message.channel.send("Deleted trivia enmap");
  }
}
