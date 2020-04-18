const https = require("https");
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch"); 
// const NewsAPI = require('newsapi');
// const newsapi = new NewsAPI('58bda63645904e57b3159a7ddfc91c6f');
const newsApi = "58bda63645904e57b3159a7ddfc91c6f";


const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.get("/", function(req,res) {
    const data = fetch(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${newsApi}`)
    .then(data => data.json())
    .then(data => { 
     console.log(data)
     for (var i = 0;i<=data.articles.length-1;i++){
        console.log("Title :"+data.articles[i].title);
        // console.log("Description: " + data.articles[i].content);
     }

    //  for (var i = 0; i <= 4; i++) {
    //      console.log("Description: " + data.articles[i].content);
    //  }
     
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
//      for (var i = 0;i<=4;i++){
//         console.log("Title :"+data.articles[i].title);
//         // console.log("Description: " + data.articles[i].content);
//      }

//      for (var i = 0; i <= 4; i++) {
//          console.log("Description: " + data.articles[i].content);
//      }
     
//     }).catch(error=>console.log(error));
// });
