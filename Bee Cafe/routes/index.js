var express = require('express');
var router = express.Router();
let userController = require('../controllers/userController');
const verify = require('../middlewares/tokenMiddleware');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET Login Page
router.get('/login', (req, res, next)=>{
  res.render('login');
});

// GET Signup Page
router.get('/signup', (req, res, next)=>{
  res.render('signup');
});

// POST Signup Page
router.post('/signup', userController.register);

// POST Login Page
router.post('/login', userController.login);

// GET Main Page
router.get('/home', verify, (req, res, next)=>{
  res.render('home');
});

// GET Logout 
router.get('/logout', (req, res, next)=>{
  res.clearCookie("auth-token");
  res.redirect('/');
});

// GET Profile Page
router.get('/profile', userController.profile);

// POST Profile Page
router.post('/profile', userController.upadteProfile);

module.exports = router;
