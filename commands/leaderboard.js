const Discord = require("discord.js");

exports.run = (client,message,args) => {
  // Get a filtered list (for this guild only), and convert to an array while we're at it.
  const filtered = client.exp.array().filter( p => p.guild === message.guild.id );

  // Sort it to get the top results... well... at the top. Y'know.
  const sorted = filtered.sort((a, b) => a.exp < b.exp);

  // Slice it, dice it, get the top 10 of it!
  const top10 = sorted.splice(0, 10);

  // Now shake it and show it! (as a nice embed, too!)
  const embed = new Discord.RichEmbed()
  .setTitle("Leaderboard")
  .setAuthor(client.user.username, client.user.avatarURL)
  .setDescription("Our top 10 EXP leaders!")
  .setColor(0x00AE86);
  for(const data of top10) {
    embed.addField(client.users.get(data.user).tag, `${data.exp} EXP (level ${data.level})`);
  }
  return message.channel.send({embed});
}
