exports.run = (client,message,args) => {
  // Limited to guild owner - adjust to your own preference!
  const modRole = "408067376546971657";
  if((!message.author.id === message.guild.owner) || !message.member.roles.has("modRole")) return message.reply("Sorry, you can't do that! :(");

  const user = message.mentions.users.first() || client.users.get(args[0]);
  if(!user) return message.reply("You must mention someone or give their ID!");

  const expToAdd = parseInt(args[1], 10);
  if(!expToAdd) return message.reply("You didn't tell me how much EXP to give...")

  // Ensure there is a points entry for this user.
  const key = `${message.guild.id}-${user.id}`;

  client.exp.ensure(key, {
    user: user.id,
    guild: message.guild.id,
    exp: 0,
    level: 0
  });

  // Get their current points.
  let userExp = client.exp.get(key, "exp");
  userExp += expToAdd;

  // And we save it!
  client.exp.set(key, userExp, "exp");

  var expSent = false;
  client.config.levels.forEach(level => {
    if (client.exp.get(key, "exp") == level.exp){
      message.reply(`You've leveled up ${user.tag} to level **${level.name}**!`)
      curLevel = level.name;
      client.exp.set(key, curLevel, "level");
    }
    else if ((client.exp.get(key, "exp") < level.exp) && expSent == false ){
      message.channel.send(`${user.tag} has received ${expToAdd} EXP and now stands at ${userExp} EXP.`);
      expSent = true;
    }
  });

}
