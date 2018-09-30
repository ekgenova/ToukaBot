const moment = require("moment");
const math = require('mathjs');

exports.run = (client,message) => {

    let ducksOne = moment({hour: 6});
    let ducksTwo = moment({hour: 12});
    let ducksThree = moment({hour: 18});
    let ducksFour = moment({hour: 24});

    let currTime = moment();

    if (currTime.isBefore(ducksOne)){
        let nextDuckHour = ducksOne.diff(currTime, "hours");
        let nextDuckMinute = math.abs(ducksOne.minute() - currTime.minute());
        return message.channel.send(`Next ducks are in ${nextDuckHour} hours and ${nextDuckMinute} minutes!`);
    }
    if (currTime.isBefore(ducksTwo) && currTime.isAfter(ducksOne)){
        let nextDuckHour = ducksTwo.diff(currTime, "hours");
        let nextDuckMinute = math.abs(ducksTwo.minute() - currTime.minute());
        return message.channel.send(`Next ducks are in ${nextDuckHour} hours and ${nextDuckMinute} minutes!`);
    }
    if (currTime.isBefore(ducksThree) && currTime.isAfter(ducksTwo)){
        let nextDuckHour = ducksThree.diff(currTime, "hours");
        let nextDuckMinute = math.abs(ducksThree.minute() - currTime.minute());
        return message.channel.send(`Next ducks are in ${nextDuckHour} hours and ${nextDuckMinute} minutes!`);
    }
    if (currTime.isBefore(ducksFour) && currTime.isAfter(ducksThree)){
        let nextDuckHour = ducksFour.diff(currTime, "hours");
        let nextDuckMinute = math.abs(ducksFour.minute() - currTime.minute());
        return message.channel.send(`Next ducks are in ${nextDuckHour} hours and ${nextDuckMinute} minutes!`);
    }
    if (currTime.isAfter(ducksFour)){
        let nextDuckHour = ducksOne.diff(currTime, "hours");
        let nextDuckMinute = math.abs(ducksOne.minute() - currTime.minute());
        return message.channel.send(`Next ducks are in ${nextDuckHour} hours and ${nextDuckMinute} minutes!`);
    }
}