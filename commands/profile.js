const Discord = require("discord.js");

exports.run = (client,message,args) => {
  const touka = client.emojis.get("485948194652553216");

  const key = `${message.guild.id}-${message.author.id}`;

  client.exp.ensure(key, {
        user: message.author.id,
        guild: message.guild.id,
        exp: 0,
        level: 0
  });
  client.credit.ensure(key, {
        user: message.author.id,
        guild: message.guild.id,
        poly: 0
  });

  const embed = new Discord.RichEmbed()
      .setTitle(`${message.author.tag}'s Profile`)
      .setAuthor(client.user.username, client.user.avatarURL)
      .setColor(0x00AE86)
      .setThumbnail(`${message.author.avatarURL}`)
      .addField(`**Level**: ${client.exp.get(key, "level")}`,`You currently have ${client.exp.get(key, "exp")} EXP`, true)
      .addField(`**Poly** <:poly:486028147821641740>:`, `${client.credit.get(key, "poly")}`, true)
      .addField(`**Claims**:`, `${client.claims.get(key, "claimList")}`)
    return message.channel.send({embed});
}
