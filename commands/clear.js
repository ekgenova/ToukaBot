exports.run = (client,message,args) => {
  // Limited to guild owner - adjust to your own preference!
  if(!message.author.id === message.guild.owner) return message.reply("Sorry, you can't do that! :(");

  const user = message.mentions.users.first() || client.users.get(args[0]);
  if(!user) return message.reply("You must mention someone or give their ID!");

  client.exp.delete(`${message.guild.id}-${user.id}`);
}
