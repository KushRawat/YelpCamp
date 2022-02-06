const express = require("express");
const app = express();
const session = require("express-session");

const sessionOptions = {
    secret: "mySecret",
    resave: false,
    saveUninitialized: false,
};
app.use(session(sessionOptions));

app.get("/pagecount", (req, res) => {
    if (req.session.count) {
        req.session.count += 1;
    } else {
        req.session.count = 1;
    }
    res.send(`You have visited this page ${req.session.count} times `);
});f

app.get("/register", (req, res) => {
    const { username = "Anonymous" } = req.query;
    req.session.username = username;
    res.redirect("/greet");
});

app.get("/greet", (req, res) => {
    res.send(`What's up ${req.session.username}`);
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
