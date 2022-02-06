const express = require("express");
const app = express();

app.use("/greet", (req, res) => {
    res.send("HELLOOO");
});

app.use("/sendname", (req, res) => {
    res.cookie("name", "yolo bhai");
    res.send("Cookie sent");
});

app.listen(3000, () => {
    console.log("Listening on 3000");
});
