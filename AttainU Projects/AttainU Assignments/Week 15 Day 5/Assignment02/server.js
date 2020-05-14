const express = require('express');
const morgan = require('morgan');
const multer = require('multer');

const storage = multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,'./uploads')
    },
    filename:function(req,file,callback){
        callback(null,file.originalname);
    }
})

const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
  }).array('myImage',3);

const app = express();

app.use(morgan('tiny'));
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.set('views','views/src')
app.set('view engine', 'hbs');
//app.set('view engine', 'ejs')

app.get('/',(req,res)=>{
    res.render('index')
    console.log('Done')
})

app.post('/multiple-upload', (req, res) => {
    upload(req, res, (err) => {
        if(err){
            res.render('index', {
            msg: err});
        } else {
            if(req.files == undefined){
                res.render('index', {
                msg: 'Error: No File Selected!'});
            } else {
        res.render('index', {
            msg: 'File Uploaded!',
            file: `uploads/${req.files.filename}`
            });
        }
      }
    });
});

app.listen(5000,(req,res)=>{
    console.log("Server is running")
})