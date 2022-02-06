const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser("mysecret"));

app.get("/greet", (req, res) => {
    // console.log(req.cookies);
    const { name = "yolo" } = req.cookies;
    res.send(`Hello ${name}`);
});

app.get("/sendname", (req, res) => {
    res.cookie("name", "yolo bhai");
    res.send("Cookie sent");
});

app.get("/getsignedcookie", (req, res) => {
    res.cookie("fruit", "grape", { signed: true });
    res.send("GET SIGNED COOKIE");
});

app.get("/verifyfruit", (req, res) => {
    res.send(req.signedCookies);
});

app.listen(3000, () => {
    console.log("Listening on 3000");
});
