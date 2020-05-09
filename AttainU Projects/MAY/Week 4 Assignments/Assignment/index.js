const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set('views', './');
app.set('view engine', 'hbs');

const userDB = [];

app.get('/', (req, res)=>{
    let data = {};
    if(req.query.loginFailed){
        data.loginFailed = true;
    }
    res.render('index', data);
});

app.post('/addTennisPlayer', (req, res)=>{
    const user = {
        name : req.body.name,
        country : req.body.country
    };
    userDB.push(user);
    console.log(userDB);
    res.write()
});


app.listen(3000, ()=>{
    console.log('Server running successfully!');
});