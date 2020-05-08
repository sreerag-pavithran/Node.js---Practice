const express = require('express');

const app = express();

app.use(express.static('public'));


app.get('/', (req, res)=>{
    res.send('Hello Priya!');
});

app.get('/post', (req, res)=>{
    res.sendFile(__dirname + '/index.html');
});



app.listen(3000, ()=>{
    console.log('Server Running Successfully!');
});