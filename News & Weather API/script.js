const https = require("https");

const express = require("express");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    const query = req.body.cityName;
    const appId = "9fb63607e5cf0c417424bae8047e90ea";
    const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + appId +"&q="+ query +"&units=metric";
    https.get(url, function(response){
        console.log(res.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            console.log(temp);
            const place = weatherData.name;
            const weather = weatherData.weather[0].main;
            const icon = weatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/"+ icon + "@2x.png";
            res.write("<p>The weather currently in "+ place + " is " + weather + "</p>");
            res.write("<h2>The temperature in " + place + " is " + temp + " degree celcius</h2>");
            res.write("<img src=" + imgURL + ">");
            res.send();
        });
    });

})


app.listen(3000, function(){
    console.log("Server running successfully!");
});