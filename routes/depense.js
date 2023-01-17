var express = require('express');
var router = express.Router();

const { find, save } = require('../service/DepenseService') ;

/* Liste de toutes les dépenses */
router.get('/:mois/:annee', find) ;

/* Engresitrement d'une dépense */
router.post('/depense', save) ;

module.exports = router ;