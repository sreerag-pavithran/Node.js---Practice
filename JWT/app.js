const express = require('express');
const app = express();
const mongoose = require('mongoose');

const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts')

mongoose
    .connect('mongodb://localhost/testdb', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=> console.log('MongoDB Connected'))
    .catch((err)=> console.log('Error Occured', err));


app.use(express.json());
app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)

app.listen(3000, console.log('>>> RESTARTING <<<'));