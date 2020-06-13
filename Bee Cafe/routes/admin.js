const express = require('express');
const router = express.Router();
const adminController = require('../controllers/itemController');

router.get('/', (req, res, next)=>{
    res.render('adminLogin');
})

router.post('/', adminController.admin)

module.exports = router;