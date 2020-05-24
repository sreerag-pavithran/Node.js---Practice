const express = require('express');
const fs = require('fs');

const app = express()

app.get('/', (req, res)=>{
    fs.readFile('dummy.txt', 'utf-8', (err, data)=>{
        if(err){
            return console.log(err);
        }
        const copyData = data;
        console.log(data);
        fs.writeFile('loremFile.txt', copyData, (err)=>{
            if(err){
                return console.log(err)
            }
        })
    })
})

app.listen(3000, ()=>{
    console.log('Server running!')
})