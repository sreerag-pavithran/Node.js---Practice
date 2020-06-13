const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res, next)=>{
    res.send('Only accesed user can see this post')
})

module.exports = router;