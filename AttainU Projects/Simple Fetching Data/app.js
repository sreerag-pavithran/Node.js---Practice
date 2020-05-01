const express = require('express');
const fetch = require('node-fetch');


const app = express();

const arr = [];

const data = fetch('http://jsonplaceholder.typicode.com/comments')
    .then(res => res.json())
    .then(json => {
        for(i in json){
            var  obj  = json[i].body;
            if(obj.length <= 50){
                console.log(obj)
                // arr.push({postId:json[i].postId,body:json[i].body})
                // console.log(arr) 
            }  
        }
        
        console.log(obj)
    })



app.listen(3000, ()=>{
    console.log('Server running successfully!');
})