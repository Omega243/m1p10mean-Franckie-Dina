var express = require('express');
var router = express.Router();

const { find, save } = require('../service/DepenseService') ;
const { affaire, paiement } = require('../service/FicheService') ;

/* Liste de toutes les dépenses */
router.get('/depenses/:mois/:annee', find) ;

/* Engresitrement d'une dépense */
router.post('/depense', save) ;

/* Chiffre d'affaire */
router.get('/affaires/:mois/:annee', affaire) ;

/* Valider un paiement */
router.put('/:id/paiement', paiement) ;

module.exports = router ;