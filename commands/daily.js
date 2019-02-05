const moment = require("moment");
const math = require('mathjs');

exports.run = (client,message) => {

  let currMoment = moment();
  const key = `${message.guild.id}-${message.author.id}`;
  client.credit.ensure(key, {
    user: message.author.id,
    guild: message.guild.id,
    poly: 0,
    next: ""
  });


  if (client.credit.get(key, "next") === "" || currMoment.diff(client.credit.get(key, "next"), "hours", true) > 8){
    let userCredit = client.credit.get(key, "poly");
    userCredit += 10;
    client.credit.set(key, userCredit, "poly");
    let nextClaim = currMoment.add(8, 'hours');
    client.credit.set(key, nextClaim, "next");
    message.reply("you've claimed 10 <:poly:485948194652553216>, come back in 8 hours for more!");
  }
  else {
    let userNextClaim = moment(client.credit.get(key, "next"));
    let hourDiff = userNextClaim.minute() > currMoment.minute() ? userNextClaim.diff(currMoment, "hours") : currMoment.diff(userNextClaim, "hours") - 1;
    const minDiff = userNextClaim.minute() > currMoment.minute() ? userNextClaim.minute() - currMoment.minute() : 60 - (currMoment.minute() - userNextClaim.minute());
    message.channel.send(`Sorry, you can't claim yet! Claim again in ${hourDiff} hours and ${minDiff} minutes!`);
  }


}
