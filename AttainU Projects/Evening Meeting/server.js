const express = require('express');

const app = express();

app.set('views', 'views');
app.set('view engine', 'ejs');

const name = "Sreerag";
const arr = [2,3,5,9];

app.get('/', (req, res)=>{
    res.render('index', {
        fname: name,
        array: arr
    });
});



app.listen(5000, ()=>{
    console.log('Running!');
});