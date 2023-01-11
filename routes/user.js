var express = require('express');
var router = express.Router() ;

router.get('/', function(req, res, next) {
    console.log('Your are in USER') ;
}) ;

router.get('/:id', function (req, res, next) {
    console.log('Your are in USER/id with id value : '+req.params.id) ;
}) ;

module.exports = router ;