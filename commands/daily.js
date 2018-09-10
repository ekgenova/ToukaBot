const moment = require("moment");
const math = require('mathjs')
const nextClaim = moment();
var claimed = false;

exports.run = (client,message) => {

  const currMoment = moment();
  const key = `${message.guild.id}-${message.author.id}`;
  client.credit.ensure(key, {
    user: message.author.id,
    guild: message.guild.id,
    poly: 0,
    next: ""
  });


  if (claimed == false || currMoment.isAfter(nextClaim)){
    let userCredit = client.credit.get(key, "poly");
    userCredit += 10;
    client.credit.set(key, userCredit, "poly");
    claimed = true;
    nextClaim.add(8, 'hours');
    client.credit.set(key, nextClaim, "next");
    message.reply("you've claimed 10 <:poly:486028147821641740>, come back in 8 hours for more!");
  }
  else {
    const hourDiff = (nextClaim.minute() - currMoment.minute()) == 0 ? math.abs(nextClaim.hour() - currMoment.hour()) : math.abs(nextClaim.hour() - currMoment.hour()) - 1;
    const minDiff = nextClaim.minute() - currMoment.minute() == 0? 0 :  math.abs(60 - (currMoment.minute() - nextClaim.minute()));
    message.channel.send(`Sorry, you can't claim yet! Claim again in ${hourDiff} hours and ${minDiff} minutes!`);
  }


}
