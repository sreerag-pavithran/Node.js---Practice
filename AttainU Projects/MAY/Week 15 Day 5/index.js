const express = require('express');
const morgan = require('morgan');
const someRouting = require('./someRoute');

const app = express();

const userRouting = express.Router();
const userName = express.Router();

app.use(morgan('tiny'));
app.use('/profile', userRouting);
app.use('/profile/some', userName);
app.use('/profile/user', someRouting);

app.get('/', (req, res)=>{
    res.send({name: 'AttainU'});
});

userRouting.get('/user', (req, res)=>{
    res.send('This is a User');
});

userName.get('/name/:id', (req, res)=>{
    const id = req.params.id;

    res.send('This is Username' + id);
});




app.listen(3000, ()=>{
    console.log('Server running successfully!');
});