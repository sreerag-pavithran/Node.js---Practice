const express = require('express');
const mongoose = require('mongoose');
const session =  require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
require('dotenv').config();

const app = express();

console.log(process.env.SECRET)
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({ 
    secret: 'a secret key',
    saveUninitialized: false,
    resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

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


userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', (req, res)=>{
    res.render('home');
});

app.get('/login', (req, res)=>{
    res.render('login');
});

app.get('/register', (req, res)=>{
    res.render('register')
});

app.get('/secrets', (req, res)=>{
    if(req.isAuthenticated()){
        res.render('secrets');
    }else{
        res.redirect('/login');
    }
})

app.post('/register', (req, res)=>{
   User.register({ username: req.body.username}, req.body.password, function(err, user){
       if(err){
           console.log(err);
           res.redirect('/register');
       }else{
           passport.authenticate('local')(req, res, function(){
               res.redirect('/secrets')
           })
       }
   })
});

app.post('/login', (req, res)=>{
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    req.login(user, function(err){
        if(err){
            console.log(err)
        }else{
            passport.authenticate('local')(req, res, function(){
                res.redirect('secrets')
            })
        }
    })
});

app.get('/logout', (req, res)=>{
    req.logout();
    res.redirect('/');
});


app.listen(3000, ()=>{
    console.log('Server running successfully!')
})