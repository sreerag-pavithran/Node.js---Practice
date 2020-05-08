const express = require('express');

const app = express();

app.use(express.json());

app.post('/add', (req, res)=>{
    let result = 0;
    let num1 = req.body.num1;
    let num2 = req.body.num2;

    result = Number(num1) + Number(num2);
    obj = {
        num1: num1,
        num2: num2,
        result: result
    }
    console.log(obj);
    res.send(obj);
})

app.post('/sub', (req, res)=>{
    let result = 0;
    num1 = req.body.num1;
    num2 = req.body.num2;

    result = Number(num1) - Number(num2);
    let obj = {
        num1: num1,
        num2: num2,
        result: result
    }

    console.log(result)
    res.send(obj);
});

app.post('/mul', (req, res)=>{
    let result = 0;
    num1 = req.body.num1;
    num2 = req.body.num2;

    result = Number(num1) * Number(num2);
    let obj = {
        num1: num1,
        num2: num2,
        result: result
    }

    console.log(result)
    res.send(obj);
});

app.post('/div', (req, res)=>{
    let result = 0;
    num1 = req.body.num1;
    num2 = req.body.num2;

    result = Number(num1) / Number(num2);
    let obj = {
        num1: num1,
        num2: num2,
        result: result
    }

    console.log(result)
    res.send(obj);
});




app.listen(3000, ()=>{
    console.log('Server running successfully!');
});