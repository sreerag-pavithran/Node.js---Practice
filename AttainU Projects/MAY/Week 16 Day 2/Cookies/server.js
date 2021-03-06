const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session')

const app = express();

app.use(cookieParser('some_secret'));
app.use(express.json());

app.get('/', (req, res)=>{
    const cookieConfig = {
        secure: false,
        httpOnly: true,
        maxAge: 10000,
        signed: true
    }
    res.cookie('cookieKey', 'cookieValue', cookieConfig); //cookieConfig is optional argument. It is an object of more details
    res.send('Cookies page');
});

app.get('/getCookie', (req, res)=>{
    const newCookie = req.signedCookies;
    console.log(newCookie);
    res.send('Getting Cookies');
})


app.listen(3000, (req, res)=>{
    console.log('Server Running successfully');
});