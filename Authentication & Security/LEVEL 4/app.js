const express = require('express');
const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');
// const md5 = require('md5');
const bcrypt = require('bcrypt');
const saltRounds = 10;
require('dotenv').config();

const app = express();

console.log(process.env.SECRET)
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('views', 'views');
app.set('view engine', 'ejs');

mongoose
    .connect('mongodb://localhost/testdb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> console.log('MongoDB connected'))
    .catch(()=> console.log('Error occured'));


const userSchema = new mongoose.Schema ({
    email: String,
    password: String
});


userSchema.plugin(encrypt, { secret: process.env.SECRET , encryptedFields: ['password'] });

const User = mongoose.model('User', userSchema)

app.get('/', (req, res)=>{
    res.render('home');
});

app.get('/login', (req, res)=>{
    res.render('login');
});

app.get('/register', (req, res)=>{
    res.render('register')
});

app.post('/register', (req, res)=>{
    bcrypt.hash(req.body.password, saltRounds, (err, hash)=>{
        // Stores hash in your password DB.
        const newUser = new User({
            email: req.body.username,
            password: hash
        });
        newUser.save(function(err){
            if(err){
                console.log(err)
            }else{
                res.render('secrets')
            }
        })
    })
});

app.post('/login', (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({ email: username }, function(err, foundData){
        if(err){
            console.log(err)
        }else{
            if(foundData){
                bcrypt.compare(password, foundData.password, (err, result)=>{
                    if(result === true){
                        res.render('secrets')
                    }
                })
            }
        }
    })
})


app.listen(3000, ()=>{
    console.log('Server running successfully!')
})