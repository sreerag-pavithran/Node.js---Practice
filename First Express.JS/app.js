const http = require('http');

const express = require('express');

const app = express();

app.use('/', (req, res, next) =>{
    console.log('In the Middleware!');
    next(); //Allows the request to continue to the next middleware line
});

app.listen(3000);
