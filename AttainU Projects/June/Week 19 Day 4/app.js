const express = require('express');

const app  = express();

app.use(express.urlencoded({ extended: false }));

app.use((err, req, res, next)=>{
    console.log('Broken');
    next(new Error('New Error'));
})





app.listen(3000, console.log('>>> RESTARTING <<<'));