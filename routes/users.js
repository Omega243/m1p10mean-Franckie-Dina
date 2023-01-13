var express = require('express');
var router = express.Router();

const { inscription } = require('../service/UserService') ;

/* INSCRIPTION */
router.post('/inscription', inscription) ;

module.exports = router;
