exports.run = (client,message,args) => {

    const key = `${message.guild.id}-${message.author.id}`;
    let unitToClaim = args.slice(0, args.length-1).join(" ");
    let polyToUse = parseInt(args[args.length-1]);
    if (args.length < 2) return message.reply("You need to tell me a unit and value to claim... :( Try something like t.claim Pascal 100 <:touka:485948194652553216>");
    if (!polyToUse) return message.reply("You didn\'t tell me how much <:poly:486028096475234310:> to use for the claim... :( Try something like t.claim Pascal 100 <:touka:485948194652553216>");

    unitToClaim = capitalise(unitToClaim);


    /* To Do:
    -make a clear claim command for admin only
     */

    let currPoly = client.credit.get(key, "poly");
    let updatedPoly = currPoly - polyToUse;

    let currPolySpent = client.claims.get(key, "totalSpent");
    let newPolySpent = currPolySpent + polyToUse;

    if (currPoly >= polyToUse) {
        if (client.claims.hasProp(key, unitToClaim)) {
            let updatedPoly = client.claims.get(key, unitToClaim) + polyToUse;
            client.claims.set(key, updatedPoly, unitToClaim);

            message.reply('You\'ve given ' + polyToUse + '<:poly:495685845383249923> to ' + unitToClaim + ' again! I can feel the love~');
        } else {
            client.claims.set(key, polyToUse, unitToClaim);
            if (client.claims.hasProp(key, "claimCount")){
                client.claims.inc(key, "claimCount");
            } else {
                client.claims.set(key, 1, "claimCount");
            }
            if (client.claims.get(key, "claimList")[0] === "None"){
                client.claims.remove(key, "None", "claimList");
                client.claims.push(key, unitToClaim, "claimList");
            } else {
                client.claims.push(key, unitToClaim, "claimList");
            }
            message.reply('You\'ve claimed ' + unitToClaim + ' using ' + polyToUse + '<:poly:495685845383249923> ~ <:heart:490338691852795914>');
        }

        client.credit.set(key, updatedPoly, "poly");
        client.claims.set(key, newPolySpent, "totalSpent");
    } else {
        message.reply('You don\'t have enough poly to use for that claim! :(');
    }





    function capitalise(str)
    {
        str = str.split(" ");

        for (var i = 0, x = str.length; i < x; i++) {
            str[i] = str[i][0].toUpperCase() + str[i].substr(1);
        }

        return str.join(" ");
    }

}