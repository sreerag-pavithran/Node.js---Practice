const express = require('express');
const fetch = require("node-fetch"); 

const app = express();

app.use(express.json());

app.get("/", function(req,res){
    const data = fetch(`https://api.covid19api.com/summary`)
    .then(data => data.json())
    .then(data => {
        // console.log(data);
        res.write("<style>table, th, td {border: 1px solid black;border-collapse: collapse;}</style>");
        res.write("<body style='padding:20px;'>");
        res.write("<h1><center>Corona Virus Live Summary</center></h1>");
        res.write("<center><button style='margin:10px 0 30px 0' formaction='#'>Refresh Table</button></center>");
        res.write("<table style='width:100%'>");
        res.write("<tr><th>COUNTRY</th><th>NEW CASES</th> <th>TOTAL CASES</th><th>TOTAL RECOVERED</th><th>TOTAL DEATHS</th></tr>")
        
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
            res.write("<tr><td>"+ countryName + "</th><th>"+ newC +"</th><th>"+ totalC + "</th><th>" + totalR + "</th><th>" + totalD + "</th>");
        }
        
        res.send();

    }).catch(error => console.log(error));
});




app.listen(3000, function(){
    console.log("Server running successfully!");
});