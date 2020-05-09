const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('views', './');
app.set('view engine', 'hbs');

const userDB = [
    {name: 'sree', country: 'india'}
];

app.get('/', (req, res)=>{
    let data = {};
    if(req.query.loginFailed){
        data.loginFailed = true;
    }
    res.render('index', data);
});

app.post('/addTennisPlayer', (req, res)=>{
    const name = req.body.name;
    const country = req.body.country;

    const found = userDB.find(el => el.name === req.body.name);
    if(found){
        res.write('<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">')
        res.write('<div class="alert alert-danger" role="alert">');
        res.write('<b>USERNAME ALREADY EXISTS!</b><br>Please Change Username. <a href="/">Click here</a>');
        res.send();
    }else{
        const data = {
            name : req.body.name,
            country : req.body.country
        };
        userDB.push(data);
        res.write('<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">')
        res.write('<div class="alert alert-success" role="alert">');
        res.write('<b>User Successfully Added!</b><br> Username: '+ name + '<br>Country: '+ country);
        res.send();
    }
    console.log(userDB);
});

app.put('/update/:name', (req, res)=>{
    const found = userDB.find(ele => ele.name === req.params.name);
    const newName = req.body.name;
    found.name = req.body.name;
    console.log(userDB)
    res.send('Username Updated Successfully!');
});

app.delete('/delete/:name', (req, res)=>{
    const found = userDB.find(ele => ele.name === req.params.name);
    if(found){
        const index = userDB.indexOf(found);
        userDB.splice(index, 1);
        console.log(userDB);
        res.send('User Deleted Successfully!');
    }else{
        res.send('Already Deleted!');
    }
    
    
})

app.listen(3000, ()=>{
    console.log('Server running successfully!');
});