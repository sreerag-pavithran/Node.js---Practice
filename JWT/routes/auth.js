const router = require('express').Router();
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const { registerValidation, loginValidation } = require('../validations/userValid');

router.post('/register', async(req, res)=>{
    // Validate data before adding new user
    const { error } = registerValidation(req.body)
    if(error){
        return res.send(error.details[0].message)
    }

    // Checking if the E-mail exists
    const emailExist = await User.findOne({ email: req.body.email });
    if(emailExist){
        return res.send('Email already exists')
    }

    // Hashing the passwords
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt)

    const user = new User({ 
        name: req.body.name,
        email: req.body.email,
        password: hashPass
     })
    try {
        await user.save()
        res.send('Added')
    } catch (error) {
        res.send('Error Adding')
    }
});

router.post('/login', async(req, res)=>{
    // Validate data before logging user
    const { error } = loginValidation(req.body);
    if(error){
        return res.send(error.details[0].message);
    };

    // Checking if email exists
    const user = await User.findOne({ email: req.body.email });
    if(!user){
        return res.send(`Email doesn't exists`)
    }

    // Password checking
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass){
        return res.send('Invalid Password')
    }

    // Create and assign a token
    let secretJWT = "kjhsdhgksj65sd465s5d6+as6+d5s6+d5+as9d86a87"
    const token = jwt.sign({ _id: user._id }, secretJWT);
    res.header('auth-token', token).send(token)

    // res.send('Logged in')
})

module.exports = router;