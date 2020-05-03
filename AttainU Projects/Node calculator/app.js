const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');


const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json())

app.get('/', (req, res)=>{
    console.log(req.body);
    res.send('Yeah! Page is Routing...');
})

app.get('/add/:number1/:number2', (req, res)=>{
    console.log(req.params);
    let result = 0;
    let num1 = req.params.number1;
    let num2 = req.params.number2;
    result = Number(num1) + Number(num2) ;
    res.write('<body style="background-color:#30BFBF;">');
    res.write('<h1 style="display:inline; color:white;">Sum of '+num1+' + '+num2+' = '+result+'</h1>');
    res.send();
});

app.get('/subtract/:number1/:number2', (req, res)=>{
    console.log(req.params);
    let result = 0;
    let num1 = req.params.number1;
    let num2 = req.params.number2;
    result = Number(num1) - Number(num2) ;
    res.write('<body style="background-color:#30BFBF;">');
    res.write('<h1 style="display:inline; color:white;">Sum of '+num1+' - '+num2+' = '+result+'</h1>');
    res.send();
});

app.get('/divide/:number1/:number2', (req, res)=>{
    console.log(req.params);
    let result = 0;
    let num1 = req.params.number1;
    let num2 = req.params.number2;
    result = Number(num1) / Number(num2) ;
    res.write('<body style="background-color:#30BFBF;">');
    res.write('<h1 style="display:inline; color:white;">Sum of '+num1+' / '+num2+' = '+result+'</h1>');
    res.send();
});

app.get('/multiply/:number1/:number2', (req, res)=>{
    console.log(req.params);
    let result = 0;
    let num1 = req.params.number1;
    let num2 = req.params.number2;
    result = Number(num1) * Number(num2) ;
    res.write('<body style="background-color:#30BFBF;">');
    res.write('<h1 style="display:inline; color:white;">Sum of '+num1+' * '+num2+' = '+result+'</h1>');
    res.send();
});


app.listen(3000, ()=>{
    console.log('Server is running');
});
