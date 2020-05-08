const express = require('express');

const someRouting = express.Router();


someRouting.get('/sree', (req, res)=>{
    res.send('This is Sree\'s Profile');
});

module.exports = someRouting;