const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const cloudinary = require('cloudinary').v2
var fs = require('fs')

cloudinary.config({
    cloud_name : 'deah2r0m5',
    api_key: '165614691255955',
    api_secret: 'TVp-m-ngz9cmtA1fjbrf6QiVZKE'
})

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

app.get('/',(req,res)=>{
    res.render('index')
    console.log('Done')
})

app.post('/multiple-upload', (req, res) => {
    upload(req, res, (err) => {
        if(err){
            res.render('index', {
            msg: err});
        }else {
            if(req.files == undefined){
                res.render('index', {
                msg: 'Error: No File Selected!'});
            } else {
                res.render('index', {
                    msg: 'File Uploaded!',
                    file: `uploads/',${req.files.filename}`
                });
            }
        }
        const urls = []
        const files = req.files;
        for (const file of files) {
            const uniqueFilename = new Date().toISOString()
            const { path } = file;
            cloudinary.uploader.upload(
                path,
                { public_id:`blog/${uniqueFilename}`,tags: 'blog'},
                function(err,image){
                    if(err) return res.send(err) 
                    console.log(image.url)
                    urls.push(image.url)
                    fs.unlinkSync(path)
                }
            )
        }
    });
   
});

app.listen(5000,()=>{
    console.log("Server is running")
})