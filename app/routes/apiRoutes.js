
const friendData = require("../data/friendData");



module.exports = (app) => {

    app.get("/api/friends", (req, res) => {
        res.json(friendData);
    });


    // Create new current reservation - takes in JSON input
    app.post("/api/friends", (req, res) => {

        const newUser = req.body;

        //Get just the values so we can sort them in order by the question number
        newUser.answers = newUser.answers.map(function (a) { return [a.answer, a.num]; });
        newUser.answers.sort((a,b) =>  a[1] - b[1]);

        //Put back just the answers in order
        newUser.answers = newUser.answers.map(function (a) { return parseInt(a[0]); });

        var newFriend = [];
        if (friendData.length != 0) {
            var bestMatchKey = -1;
            var bestMatchScore = 0;
            friendData.forEach(function(friendValue, friendKey) {
                var matchScore = 0;
                newUser.answers.forEach(function(userValue,userKey) {
                    matchScore += Math.abs(userValue - friendValue.answers[userKey]);
                })
                if ((bestMatchKey === -1) || 
                    ((bestMatchKey != -1) && (bestMatchScore > matchScore))
                   ){
                    bestMatchKey = friendKey;
                    bestMatchScore = matchScore;
                } 
            })
            newFriend = friendData[bestMatchKey]
        } 

        friendData.push(newUser);
        res.json(newFriend);
    });

}