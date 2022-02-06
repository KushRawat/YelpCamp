const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use("/greet", (req, res) => {
    // console.log(req.cookies);
    const { name = "yolo" } = req.cookies;
    res.send(`Hello ${name}`);
});

app.use("/sendname", (req, res) => {
    res.cookie("name", "yolo bhai");
    res.send("Cookie sent");
});

app.listen(3000, () => {
    console.log("Listening on 3000");
});
