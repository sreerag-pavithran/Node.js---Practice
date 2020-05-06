const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(express.static("public"));

app.get('/', (req, res)=>{
    // res.sendFile(path.join('/'))
})

app.get("/html", function(req, res){
    res.sendFile(__dirname + "/views/index.html");
});


app.listen(3000, ()=>{
    console.log('Server running successfully!');
})