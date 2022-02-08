const express = require("express");
const app = express();
const User = require("./models/users");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

mongoose
    .connect("mongodb://localhost:27017/authDemo", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DATABASE CONNECTED");
    })
    .catch((err) => {
        console.log("EROR CONNECTING TO DB");
        console.log(err);
    });

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("THIS IS HOME PAGE");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const user = await new User({ username, password: hash });
    await user.save();
    res.redirect("/");
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
        res.send("LOGGED IN");
    } else {
        res.send("WRONG CREDENTIALS");
    }
});

app.get("/secret", async (req, res) => {
    res.send("This is a secret. you cant see me unitl you are logged in");
});

app.listen(3000, () => {
    console.log("SERVING YOUR APP");
});
