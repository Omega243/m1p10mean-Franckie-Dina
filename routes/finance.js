var express = require('express');
var router = express.Router();

const { find, save } = require('../service/DepenseService') ;
const { affaire, paiement } = require('../service/FicheService') ;
const { bilan, affaireJournaliere } = require('../service/FinanceService') ;

/* Bilan mensuel */
router.get('/bilan/:mois/:annee', bilan) ;

/* Chiffre d'affaire journalière */
router.get('/affaires/journaliers/:mois/:annee', affaireJournaliere) ;

/* Liste de toutes les dépenses */
router.get('/depenses/:mois/:annee', find) ;

/* Engresitrement d'une dépense */
router.post('/depense', save) ;

/* Chiffre d'affaire mensuel */
router.get('/affaires/:mois/:annee', affaire) ;

/* Valider un paiement */
router.put('/:id/paiement', paiement) ;

module.exports = router ;