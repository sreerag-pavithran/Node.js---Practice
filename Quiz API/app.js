const https = require("https");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/game", function(req,res) {
    const playerName = req.body.player;
    console.log(playerName);
});

app.use("/", function(req,res) {
    res.sendFile(__dirname + "/game.html");
});









app.listen(3000, function(){
    console.log("Server running successfully!");
});