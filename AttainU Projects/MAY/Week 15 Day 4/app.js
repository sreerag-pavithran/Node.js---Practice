const express =  require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('views', 'src/views');
app.set('view engine', 'hbs');

const userDB = [
    {
        name: 'sree',
        password: '123'
    }
];

app.get('/', (req, res)=>{
    let data = {};
    if(req.query.loginFailed){
        data.loginFailed = true;
    }
    res.render('index', data);
});

app.post('/login', (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    console.log(username, password);
    for(let user in userDB){
        if(userDB[user].name == username && userDB[user].password == password){
            return res.status(200).send('Logged in');
        }res.redirect('/?:loginFailed=true')
    }
})

app.listen(3000, ()=>{
    console.log('Server running successfully!');
});