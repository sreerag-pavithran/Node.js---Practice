const express = require("express");
const bodyParser = require("body-parser");
const ejs =  require("ejs")

const app = express();

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  var today = new Date();


  res.render("list", {
      kindOfDay: day
  });

});

app.listen(3000, function () {
  console.log("Server running successfully");
});