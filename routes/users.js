var express = require('express');
var router = express.Router();

const { login, inscription, logout } = require('../service/UserService') ;

/* LOGIN */
router.post('/login', login) ;

/* INSCRIPTION */
router.post('/inscription', inscription) ;

/* LOGOUT */
router.post('/logout', logout) ;

module.exports = router;
