var express = require('express');
var router = express.Router();

const Role = require("../models/Role") ;

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.post('/inscription', async function(req, res) {
  console.log(req.body) ;
  await new Role({intitule: req.body.intitule}).save() ;
  Role.find({}).then((result) => res.status(200).json(result)) ;
}) ;

module.exports = router;
