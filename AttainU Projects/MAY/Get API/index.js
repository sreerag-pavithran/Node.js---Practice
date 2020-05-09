const express = require('express');

const app = express();

app.use(express.json());

let arr = [
    {id:1,"name":"Sample Name 1"},
    {id:2,"name":"Sample Name 2"},
    {id:3,"name":"Sample Name 3"},
    {id:4,"name":"Sample Name 4"},
    {id:3,"name":"Sample Name 5"}
];

app.get('/', (req, res)=>{
    console.log(arr);
    res.send(arr);
});

app.get('/:id', (req, res)=>{
    let postId = arr.find(c => c.id === parseInt(req.params.id));
    console.log(postId);
    if(!postId){
        res.status(404).send('The ID was not found');
    }
    res.send(postId);
});

app.post('/post', (req, res)=>{
    let post = {
        id: arr.length + 1,
        name: req.body.name
    }
    arr.push(post);
    console.log(arr);
    res.send(arr);
});

app.put('/:id', (req, res)=>{
    let postId = arr.find(c => c.id === parseInt(req.params.id));
    console.log(postId);
    console.log(typeof postId)
    postId.name = req.body.name;
    res.send(postId);
    console.log(arr);
});

app.delete('/:id', (req, res)=>{
    let postId = arr.find(c => c.id === parseInt(req.params.id));
    console.log(postId);
    const index = arr.indexOf(postId);
    arr.splice(index, 1);
    console.log(arr);
    res.send(arr)
});



app.listen(3000, (req, res)=>{
    console.log('Server running successfully!');
});
