const Item = require('../models/itemModel');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

let admin = (req, res, next)=>{
    let email = req.body.email;
    let password = req.body.password;
    User.findOne({ email: email }, (err, data)=>{
        if(err){
            console.log('Error Occured')
        }else{
            if(data){
                bcrypt.compare(password, data.password, (err, result)=>{
                    if(err){
                        console.log('Error Occured', err)
                    }else{
                        if(result === true)
                        res.render('admin')
                    }
                })
            }
        }
    })
}

let addItem = async(req, res, next)=>{

}

module.exports = {
    addItem, admin
}