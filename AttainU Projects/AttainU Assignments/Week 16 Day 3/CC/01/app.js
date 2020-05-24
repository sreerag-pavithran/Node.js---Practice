const express = require('express');
const fs = require('fs');

const app = express();

app.get('/', (req, res)=>{
    fs.readFile('lwcaseFile.txt', 'utf-8', (err, data)=>{
        const toUpper = data.toUpperCase()
        console.log(toUpper);
        fs.writeFile('uppcaseFile.txt', toUpper, (err)=>{
            if(err){
                return console.log(err)
            }
        })
    })
})

app.listen(3000, ()=>{
    console.log('Server running!');
});