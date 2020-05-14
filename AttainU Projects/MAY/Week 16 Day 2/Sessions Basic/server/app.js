const express = require('express');
const { v4: uuid } = require('uuid');
const expressSession = require('express-session');

const app = express();

app.use(expressSession({
    generateId: (req)=>{
        console.log('Inside the middleware');
        console.log(req.sessionID);
        return uuid();
    },
    secret: 'sreerag',
    resave: false,
    saveUninitialized: true
}))

app.get('/', (req, res)=>{
    const uniqueId = uuid();
    console.log(req.sessionID)
    res.send(`Hello World! ${uniqueId}`);
}); 

app.listen(3000, ()=>[
    console.log('Server running!')
]);