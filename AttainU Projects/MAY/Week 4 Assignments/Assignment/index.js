const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('X-HTTP-Method-Override'));

app.set('views', './');
app.set('view engine', 'hbs');
// app.set('view engine', 'ejs');

const userDB = [
    {name: 'Sreerag', country: 'India'},
    {name: 'John Doe', country: 'America'}
];


app.get('/', (req, res)=>{
    let data = {};
    if(req.query.loginFailed){
        data.loginFailed = true;
    }
    res.render('index', data);
});

app.post('/addPlayer', (req, res)=>{
    const name = req.body.name;
    const country = req.body.country;
    const found = userDB.find(el => el.name === req.body.name);
    const data = {
        name: name,
        country: country
    }
    if(!found){
        userDB.push(data);
        res.render('addPlayer', {
            player: name,
            country: country
        });
    }else{
        res.redirect('/?loginFailed=true')
    }
    console.log(name, country);
    console.log(data);
});

app.get('/playerList', (req, res)=>{
    res.render('playerList', {element: userDB});
});

app.get('/updatePlayer', (req, res)=>{
    res.render('updatePlayer');
});

app.post('/updatePlayer', (req, res)=>{
    const found = userDB.find(ele => ele.name === req.body.name);
    console.log('Founded', found)
    const newName = req.body.newName;
    const newCountry = req.body.newCountry;
    if(found){
        found.name = newName;
        found.country = newCountry;
        data = {
            name: newName,
            country: newCountry
        }
        var message = '<script type="text/javascript"> alert("Player Updated Successfully!"); window.location= "/playerList"; </script>';
        res.send(message);
    }else{
        var messageFail = '<script type="text/javascript"> alert("Cannot Update Player. Re-check Player Name!"); window.location= "/updatePlayer"; </script>';
        res.send(messageFail);
    }
    console.log(newCountry, newName);
    console.log(userDB);
});

app.get('/deletePlayer', (req, res)=>{
    res.render('deletePlayer');
});

app.post('/deletePlayer', (req, res)=>{
    const found = userDB.find(ele => ele.name === req.body.name);
    if(found){
        const index = userDB.indexOf(found);
        userDB.splice(index, 1);
        var messageDel = '<script type="text/javascript"> alert("Player Deleted Successfully!"); window.location= "/"; </script>';
        res.send(messageDel);
    }else{
        var messageFailed = '<script type="text/javascript"> alert("Please Re-Check Player Name!"); window.location= "/deletePlayer"; </script>';
        res.send(messageFailed);
    }
})


// app.get('/', (req, res)=>{
//     let data = {};
//     if(req.query.loginFailed){
//         data.loginFailed = true;
//     }
//     res.render('index', data);
// });

// app.post('/addTennisPlayer', (req, res)=>{
//     const name = req.body.name;
//     const country = req.body.country;

//     const found = userDB.find(el => el.name === req.body.name);
//     if(found){
//         res.write('<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">')
//         res.write('<div class="alert alert-danger" role="alert">');
//         res.write('<b>USERNAME ALREADY EXISTS!</b><br>Please Change Username. <a href="/">Click here</a>');
//         res.send();
//     }else{
//         const data = {
//             name : req.body.name,
//             country : req.body.country
//         };
//         userDB.push(data);
//         res.write('<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">')
//         res.write('<div class="alert alert-success" role="alert">');
//         res.write('<b>User Successfully Added!</b><br> Username: '+ name + '<br>Country: '+ country);
//         res.send();
//     }
//     console.log(userDB);
// });

// app.put('/update/:name', (req, res)=>{
//     const found = userDB.find(ele => ele.name === req.params.name);
//     const newName = req.body.name;
//     found.name = req.body.name;
//     console.log(userDB)
//     res.send('Username Updated Successfully!');
// });

// app.delete('/delete/:name', (req, res)=>{
//     const found = userDB.find(ele => ele.name === req.params.name);
//     if(found){
//         const index = userDB.indexOf(found);
//         userDB.splice(index, 1);
//         console.log(userDB);
//         res.send('User Deleted Successfully!');
//     }else{
//         res.send('Already Deleted!');
//     }
    
    
// })

app.listen(PORT, ()=>{
    console.log('Server running successfully!');
});