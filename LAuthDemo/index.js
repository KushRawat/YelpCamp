const express = require("express");
const app = express();
// const router = express.Router();

const User = require("./models/users");

app.set("view engine", "ejs");
app.set("views", "views");

app.get("/register", async (req, res) => {
    res.render("register");
});

app.get("/secret", async (req, res) => {
    res.send("This is a secret. you cant see me unitl you are logged in");
});

app.listen(3000, () => {
    console.log("SERVING YOUR APP");
});
