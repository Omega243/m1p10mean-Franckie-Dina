var express = require('express');
var router = express.Router();

const Role = require("../models/Role") ;

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.post('/inscription', function(req, res) {
  console.log(req.body) ;
  Role.save({intitule: req.body.intitule}).then((result) => res.status(200).json(result)) ;
}) ;

module.exports = router;
