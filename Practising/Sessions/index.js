const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

app.use(cookieParser('Secret_Key'));
app.use(session({
    secret: 'SecretKey',
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 60000 }
}));

app.get('/', (req, res)=>{
    let ssid = req.sessionID
    if(req.session.views){
        req.session.views++;
        res.setHeader('content-type', 'text/html')
        res.write('Views: '+ req.session.views+'<br>'+ 'Session ID: ' +ssid+'<br>');
        res.write('Session expires in: '+ req.session.cookie.maxAge/1000);
        res.send();
    }else{
        req.session.views = 1;
        res.send('Refresh page')
    }
})



app.listen(3000, ()=>{
    console.log('Server running!')
})