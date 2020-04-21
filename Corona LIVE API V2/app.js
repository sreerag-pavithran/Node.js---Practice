const express = require('express');
const fetch = require("node-fetch"); 

const app = express();

app.use(express.json());

app.get("/", function(req,res){
    const data = fetch(`https://api.covid19api.com/summary`)
    .then(data => data.json())
    .then(data => {
        // console.log(data);
        res.write("<body style='margin-top: 40px; margin-left: 40px;'>");
        res.write('<h1 style="color: rgb(219, 40, 40); text-align: center; font-family: sans-serif;margin-bottom: 40px;">COVID-19 LIVE SUMMARY</h1>')
        
        for (var i=0; i<data.Countries.length; i++){
            const countryName = data.Countries[i].Country;
            const newC = data.Countries[i].NewConfirmed;
            const totalC = data.Countries[i].TotalConfirmed;
            const totalD = data.Countries[i].TotalDeaths;
            var totalR = data.Countries[i].TotalRecovered;

            // console.log(data.Countries[i].Country);
            // console.log(data.Countries[i].NewConfirmed);
            // console.log(data.Countries[i].TotalConfirmed);
            // console.log(data.Countries[i].TotalDeaths);
            // console.log(data.Countries[i].TotalRecovered);
            res.write('<div class="container" style="margin-right:10px; margin-bottom:10px; font-family: sans-serif; border: 2px solid rgb(0, 152, 240); width: 250px; padding:10px; float:left; display: flexbox;">');
            res.write('<h2 style="text-align: center;">'+ countryName +'</h2>');
            res.write('<p>New Confirmed: '+ newC +'</p>');
            res.write('<p>Total Confirmed: '+ totalC +'</p>');
            res.write('<p>Total Deaths: '+ totalD +'</p>');
            res.write('<p>Total Recovered: '+ totalR +'</p>');
            res.write('</div>');

        }
        
        res.send();

    }).catch(error => console.log(error));
});




app.listen(3000, function(){
    console.log("Server running successfully!");
});