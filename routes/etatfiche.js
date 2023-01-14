var express = require('express');
var router = express.Router();

const { find, save } = require('../service/EtatficheService') ;

/* Liste des états d'une fiche */
router.get('/', find) ;

/* Nouvelle fiche */
router.post('/etatfiche', save) ;

module.exports = router ;