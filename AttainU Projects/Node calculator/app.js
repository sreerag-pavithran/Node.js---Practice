const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')


const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json())

app.get('/', (req, res)=>{
    console.log(req.body);
    res.send('hey i am routing');
})

app.get('/add/:number1/:number2', (req, res)=>{
    console.log(req.params);
    let result = 0;
    let num1 = req.params.number1;
    let num2 = req.params.number2;
    result = Number(num1) + Number(num2) ;
    res.send('Sum is '+result);
})

app.listen(3000, ()=>{
    console.log('Server is running');
});
