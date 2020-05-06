const express = require('express');
const fetch = require('node-fetch');


const app = express();

const arr = [];

const data = fetch('http://jsonplaceholder.typicode.com/comments')
    .then(res => res.json())
    .then(json => {    
        console.log(json);
        let arr = [];
        let filterArr = [];
        let count = 0;
        let postCount = {};
        for(i in json){
            arr.push({'postId':json[i].postId,'body':json[i].body});
            if(json[i].body.length<=50){
                filterArr.push({'postId':json[i].postId,'body':json[i].body});
            }
            if(!postCount[arr[i].postId])
            postCount[arr[i].postId] = count + 1
        else{
            postCount[arr[i].postId]= postCount[arr[i].postId] +1
        }
        }
        console.log(arr)    
        console.log(filterArr)
        console.log(postCount)
    })



app.listen(3000, ()=>{
    console.log('Server running successfully!');
})