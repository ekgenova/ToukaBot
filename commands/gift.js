exports.run = (client,message,args) => {

  const user = message.mentions.users.first() || client.users.get(args[0]);
  if(!user) return message.reply("You must mention someone or give their ID!");

  const polyToGift = parseInt(args[1], 10);
  if(!polyToGift) return message.reply("You didn't tell me how much <:poly:486028147821641740> to give... :(")

  // Ensure there is a points entry for this user.
  const receiver = `${message.guild.id}-${user.id}`;
  const gifter = `${message.guild.id}-${message.author.id}`;

  client.credit.ensure(receiver, {
    user: user.id,
    guild: message.guild.id,
    poly: 0,
    next: ""
  });

  client.credit.ensure(gifter, {
    user: message.author.id,
    guild: message.guild.id,
    poly: 0,
    next: ""
  });
  // Get their current points.
  let receiverPoly = client.credit.get(receiver, "poly");
  receiverPoly += polyToGift;
  let gifterPoly = client.credit.get(gifter, "poly");
  gifterPoly -= polyToGift;

  // And we save it!
  if (gifterPoly > polyToGift){
    client.credit.set(receiver, receiverPoly, "poly");
    client.credit.set(gifter, gifterPoly, "poly");
  }

  message.channel.send(`<@${user.id}> has received ${polyToGift} <:poly:486028147821641740> from <@${message.author.id}>~ `);
    }
