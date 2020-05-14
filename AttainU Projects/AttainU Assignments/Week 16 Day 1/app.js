const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();


app.use(cookieParser('some_secret'));
app.use(express.json());

const valueCoo = {
    name: 'Cookie Name'
}

app.get('/', (req, res)=>{
    res.cookie('cookieKey', valueCoo, { maxAge: 1000*60*10 });
    res.send(req.cookies);
});

app.listen(3000, (req, res)=>{
    console.log('Server Running successfully');
});