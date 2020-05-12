const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary');
// const upload = multer({ dest: 'public/images' });

const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, 'uploads')
    },
    filename: function(req, file, callback){
        callback(null, file.originalname);
    }
});

const upload = multer(({storage}));

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res)=>{
    console.log('Hello Sreerag');
    res.send('Successful Message');
});

app.post('/upload', upload.single('profile_pic'), (req, res)=>{
    console.log(req.file);
    res.send('Hello World!');
});

//HERE I'M GIVING A MAXIMUM NUMBER OF UPLOADS USING ARRAY.
// app.post('/upload', upload.array('profile_pic', 3), (req, res)=>{ //THIS LINE.
//     console.log(req.file);
//     res.send('Hello World!');
// });





app.listen(3000, (req, res)=>{
    console.log('Server running successfully!');
});