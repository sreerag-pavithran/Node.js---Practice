const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: function(req, file, cb){
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000}
}).single('myImage');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('./public'));

app.set('views', 'views');
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    res.render('index');
});

app.post('/upload', (req, res)=>{
    upload(req, res, (err)=>{
        if(err){
            res.render('index', {
                msg: err
            });
        }else{
            if(req.file == undefined){
                res.render('index', {
                    msg: 'Error: No file selected!'
                });
            }else{
                res.render('index', {
                    msg: 'File uploaded successfullly!',
                    file: `uploads/${req.file.filename}`
                })
            }
        }

    })
})



app.listen(3000, ()=>{
    console.log('Server running successfully!');
});