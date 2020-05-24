const express = require("express");
const hbs = require("hbs");
const path = require("path");
const fs = require("fs");

const app = express();

const jsonPath = path.join(__dirname, "./data/data.json");

app.use(express.urlencoded({ extended: false }));

app.set("views", "./");
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/add", (req, res) => {
  fs.readFile(jsonPath, { encoding: "utf-8" }, (err, data) => {
    const userJS = JSON.parse(data);
    if (err) {
      return res.send(arr);
    }
    const { name, country } = req.body;
    const userOBJ = { name, country };
    userJS.push(userOBJ);
    const userJSON = JSON.stringify(userJS);
    fs.writeFile(jsonPath, userJSON, (err) => {
      if (err) {
        return console.log(err.message);
      }
    });
    res.redirect("/");
  });
});

// app.post('/add', (req, res)=>{
//     fs.readFile(jsonPath, {encoding: 'utf-8'}, (err, data)=>{
//         const userJS = JSON.parse(data);
//         if(err){
//             return res.send(err);
//         }
//         const {name, country} = req.body;
//         const userObj = { name, country };
//         userJS.push(userObj);
//         const userJSON = JSON.stringify(userJS);
//         fs.writeFile(jsonPath, userJSON, (err)=>{
//             if(err) console.log(err.message)
//         })
//     })
//     res.redirect('/')
// })

app.listen(3000, () => {
  console.log("Server Running!");
});
