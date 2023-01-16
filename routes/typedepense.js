var express = require('express');
var router = express.Router();

const { find, save } = require('../service/TypedepenseService') ;

/* Liste des tous les types de dépenses */
router.get('/', find) ;

/* Enregistrement d'un type de dépense */
router.post('/typedepense', save) ;

module.exports = router ;