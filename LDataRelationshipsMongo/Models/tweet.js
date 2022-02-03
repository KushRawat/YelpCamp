const mongoose = require("mongoose");

mongoose
    .connect("mongodb://localhost:27017/relationshipDemo", {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!");
    })
    .catch((err) => {
        console.log("MONGO CONNECTION ERROR!");
        console.log(err);
    });

const userSchema = new mongoose.Schema({
    username: String,
    age: Number,
});

const tweetSchema = new mongoose.Schema({
    text: String,
    likes: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const User = mongoose.model("User", userSchema);
const Tweet = mongoose.model("Tweet", tweetSchema);

const makeTweets = async () => {
    // const user = new User({ username: "kush", age: 23 });
    const user = await User.findOne({ username: "kush", age: 23 });
    // const tweet1 = new Tweet({ text: "kush rocks", like: 0 });
    const tweet2 = new Tweet({ text: "kush rocks 2", like: 123 });
    tweet2.user = user;
    // user.save()
    tweet2.save();
};

// makeTweets()

const findTweet = async () => {
    Tweet.find()
        .populate("user", "username")
        .then((tweet) => {
            console.log(tweet);
        });
};

findTweet();
