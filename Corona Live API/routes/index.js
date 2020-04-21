var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

/* GET home page. */
router.get('/', function(req, res, next) {
  const data = fetch(`https://api.covid19api.com/summary`)
    .then(data => data.json())
    .then(data => {
        // for (var i=0; i<data.Countries.length; i++){
        //     const countryName = data.Countries[i].Country;
        //     const newC = data.Countries[i].NewConfirmed;
        //     const totalC = data.Countries[i].TotalConfirmed;
        //     const totalD = data.Countries[i].TotalDeaths;
        //     var totalR = data.Countries[i].TotalRecovered;
        // }
         res.render('index', {title : 'sreerag', data : data})


    }).catch(error => console.log(error));
});

module.exports = router;
