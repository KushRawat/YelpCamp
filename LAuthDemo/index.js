const express = require("express");
const app = express();
const User = require("./models/users");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const session = require("express-session");

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
app.use(session({ secret: "thisisnotagoodsecret" }));

const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect("/login");
    }
    next();
};

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
    // const hash = await bcrypt.hash(password, 12);
    const user = new User({ username, password });
    await user.save();
    req.session.user_id = user._id;
    res.redirect("/secret");
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await User.findAndValidate(username, password);
    // const foundUser = await User.findOne({ username });
    // const validPassword = await bcrypt.compare(password, foundUser.password);
    if (foundUser) {
        req.session.user_id = foundUser._id;
        res.redirect("/secret");
        // res.send("LOGGED IN");
    } else {
        res.redirect("/login");
        // res.send("WRONG CREDENTIALS");
    }
});

app.post("/logout", (req, res) => {
    req.session.user_id = null;
    // req.session.destroy()
    res.redirect("/login");
});

app.get("/secret", requireLogin, (req, res) => {
    // if (!req.session.user_id) {
    //     return res.redirect("/login");
    // }
    // console.log(req.session.user_id)
    res.render("secret");
});

app.listen(3000, () => {
    console.log("SERVING YOUR APP");
});
