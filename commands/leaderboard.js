const Discord = require("discord.js");

exports.run = (client,message,args) => {

  // Get a filtered list (for this guild only), and convert to an array while we're at it.
  let filteredExp = client.exp.array().filter( p => p.guild === message.guild.id );
  let filteredClaims = client.claims.array().filter( p => p.guild === message.guild.id);

  if (args[0] === "exp") {

      let sortedExp = filteredExp.sort((a, b) => a.exp < b.exp);

      let top10Exp = sortedExp.splice(0, 10);

      let embedExp = new Discord.RichEmbed()
          .setTitle("EXP Leaderboard")
          .setAuthor(client.user.username, client.user.avatarURL)
          .setDescription("Our top 10 EXP leaders!")
          .setColor(0x00AE86);
      for (let data of top10Exp) {
          embedExp.addField(client.users.get(data.user).tag, `${data.exp} EXP (level ${data.level})`, true);
      }
      return message.channel.send(embedExp);
  }

  if (args[0] === "claims"){

      let sortedClaimCount = filteredClaims.sort((a,b) => a.claimCount < b.claimCount);

      let top10ClaimCount = sortedClaimCount.splice(0,10);

      let embedClaims = new Discord.RichEmbed()
          .setTitle("Claims Leaderboard")
          .setAuthor(client.user.username, client.user.avatarURL)
          .setDescription("Top 5 users that have claimed the most units~");
      for (let data2 of top10ClaimCount){
          if (data2.user === undefined){
              break;
          }else{
              embedClaims.addField(client.users.get(data2.user).tag, `${data2.claimCount}`, true);
          }
      }
      return message.channel.send(embedClaims);
  }

  if (args[0] === "poly"){

      let sortedClaimTotalSpent = filteredClaims.sort((a,b) => a.totalSpent < b.totalSpent);

      let top10TotalSpent = sortedClaimTotalSpent.splice(0,10);

      let embedClaims2 = new Discord.RichEmbed()
          .setTitle("Claims Leaderboard")
          .setAuthor(client.user.username, client.user.avatarURL)
          .setDescription("Top 5 users that have spent the most poly claiming~");
      for (let data3 of top10TotalSpent){
          let userID = client.users.get(data3.user).id;
          let key = `${message.guild.id}-${message.author.id}`;
          embedClaims2.addField(`${client.users.get(data3.user).tag}`, `${client.claims.get(key, "totalSpent")}` , true);
      }
      return message.channel.send(embedClaims2);
  }
}
