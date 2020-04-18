const https = require("https");
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch"); 
// const NewsAPI = require('newsapi');
// const newsapi = new NewsAPI('58bda63645904e57b3159a7ddfc91c6f');
const newsApi = "58bda63645904e57b3159a7ddfc91c6f";


const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
// app.use(express.static("public"));

app.get("/", function(req,res) {
    const data = fetch(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${newsApi}`)
    .then(data => data.json())
    .then(data => { 
  
    const title1 = data.articles[0].title;
    const title2 = data.articles[1].title;
    const title3 = data.articles[2].title;
    const title4 = data.articles[3].title;
    const title5 = data.articles[4].title;

    const cont1 = data.articles[0].description;
    const cont2 = data.articles[1].description;
    const cont3 = data.articles[2].description;
    const cont4 = data.articles[3].description;
    const cont5 = data.articles[4].description;

    const link1 = data.articles[0].url;
    const link2 = data.articles[1].url;
    const link3 = data.articles[2].url;
    const link4 = data.articles[3].url;
    const link5 = data.articles[4].url;

    // console.log(title);
    res.write("<body style='background-color:#30BFBF;'>");
    res.write("<h1 style='font-family:sans-serif; color: white; margin-top:30px; margin-left:42%'>Top 5 News</h1>");
    res.write("<div style='background-color: #fff;padding:30px; font-family:sans-serif;'>");
    res.write("<h2>" + title1 + "</h2>");
    res.write("<p> <strong>Description: </strong>" + cont1 + "</p>");
    res.write("<a href='" + link1 +"'> Read More</a>");
    res.write("<hr style='width:50%; margin-top:15px;margin-bottom:40px;'>");
    res.write("<h2>" + title2 + "</h2>");
    res.write("<p> <strong>Description: </strong>" + cont2 + "</p>");
    res.write("<a href='" + link2 +"'> Read More</a>");
    res.write("<hr style='width:50%; margin-top:15px;margin-bottom:40px;'>");
    res.write("<h2>" + title3 + "</h2>");
    res.write("<p> <strong>Description: </strong>" + cont3 + "</p>");
    res.write("<a href='" + link3 +"'> Read More</a>");
    res.write("<hr style='width:50%; margin-top:15px;margin-bottom:40px;'>");
    res.write("<h2>" + title4 + "</h2>");
    res.write("<p> <strong>Description: </strong>" + cont4 + "</p>");
    res.write("<a href='" + link4 +"'> Read More</a>");
    res.write("<hr style='width:50%; margin-top:15px;margin-bottom:40px;'>");
    res.write("<h2>" + title5 + "</h2>");
    res.write("<p> <strong>Description: </strong>" + cont5 + "</p>");
    res.write("<a href='" + link5 +"'> Read More</a>");
    res.write("<hr style='width:50%; margin-top:15px;margin-bottom:40px;'>");
    res.write("</div>")
    
    res.send();

    }).catch(error=>console.log(error));

});






app.listen(5000, function(){
    console.log("Server running successfully!");
});

// API Key : 58bda63645904e57b3159a7ddfc91c6f

// ------------ NEW METHOD ES8 ----------

// app.get("/", async function(req,res) {
//     const data = await fetch(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${newsApi}`)
//     const wish = await data.json();
//     res.json(wish)
// });


// -----------USING FETCH API SYNTAX ------------
// app.get("/", function(req,res) {
//     const data = fetch(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${newsApi}`)
//     .then(data => data.json())
//     .then(data => { 
//      console.log(data)
//      for (var i = 0;i<=data.articles.length-1;i++){
//         console.log("Title :"+data.articles[i].title);
//         // console.log("Description: " + data.articles[i].content);
//      }

//      for (var i = 0; i <= 4; i++) {
//          console.log("Description: " + data.articles[i].content);
//      }
     
//     }).catch(error=>console.log(error));
// });

// ------------ USING FOR LOOP BUT GETTING ERROR -----------
// for (var i = 0;i<=data.articles.length-1;i++){
//     res.write(data.articles[i].title);
//     res.send();
//     // console.log("Title :"+data.articles[i].title);
//     console.log("Description: " + data.articles[i].content);
    
// }