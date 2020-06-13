const User = require('../models/userModel');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const { signupValidation, loginValidation } = require('../validations/userValidation');
const { findOne } = require('../models/userModel');
const app = require('../app');
const router = require('../routes');
const { string } = require('@hapi/joi');
require('dotenv');


let register = async(req, res, next)=>{
    const { error } = signupValidation(req.body);
    if(error){
        let message = error.details[0].message;
        console.log(message)
        return res.send(message);
        // error.details[0].message
    }

    const mailExist = await User.findOne({ email: req.body.email });
    if(mailExist){
        return res.send('<script type="text/javascript"> alert("Email Already Exists!"); </script>');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        number: req.body.number,
        addressOne: req.body.addressOne,
        addressTwo: req.body.addressTwo,
        city: req.body.city,
        zip: req.body.zip
    })
    try {
        await user.save()
        res.send('<script type="text/javascript"> alert("User Registered Successfully!"); window.location= "/login"; </script>');
    } catch (error) {
        console.log('Error Occured Here', error);
    }
};

let login = async(req, res, next)=>{
    const { error } = loginValidation(req.body);
    if(error){
        res.send(error)
    };

    const user = await User.findOne({ email: req.body.email });
    if(!user){
        res.send('<script type="text/javascript"> alert("Email Doesnt exists!");</script>');
    };

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass){
        res.send('<script type="text/javascript"> alert("Wrong Password");</script>');
    };

    let userName = user.name;
    let secret = `kjsd635d4f63sd54df63@4&sd565ds+dd54d4*&s54sd6ad`;
    const token = jwt.sign({ _id: user._id }, secret);
    return res.cookie('auth-token', token, {
        maxAge: new Date(Date.now() + 10*60*60),
        secure: false,
        httpOnly: true
    }).render('home', {
        user: userName
    });
};


let profile = async(req, res, next)=>{
    const token = req.cookies['auth-token'];
    let decoded = jwt_decode(token);
    console.log(decoded);
    let userId = String(decoded._id);
    let user = await User.findOne({ _id: userId })
    res.render('profile', {
        user: user
    })
};

let upadteProfile = async(req, res, next)=>{
    const token = req.cookies['auth-token'];
    let decoded = jwt_decode(token);
    console.log(decoded);
    let userId = String(decoded._id);
    let user = await User.findOne({ _id: userId })
    let updatedUser = { ...req.body }
    let updated = await User.findOneAndUpdate(userId, updatedUser )
    try {
        res.render('updatedUser', {
            user: updated
        })
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    register, login, profile, upadteProfile
}