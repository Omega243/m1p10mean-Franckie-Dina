var express = require('express');
var router = express.Router();

const { find, save } = require('../service/DepenseService') ;
const { ficheNonPaye, paiement } = require('../service/FicheService') ;
const { bilan, chiffreAffaireJournaliere, chiffreAffaireMensuel } = require('../service/FinanceService') ;

/* Fiche non-payé */
router.get('/fiches/non-paye', ficheNonPaye) ;

/* Bilan mensuel */
router.get('/bilan/:mois/:annee', bilan) ;

/* Chiffre d'affaire journalière */
router.get('/affaires/journaliers/:mois/:annee', chiffreAffaireJournaliere) ;

/* Liste de toutes les dépenses */
router.get('/depenses/:mois/:annee', find) ;

/* Engresitrement d'une dépense */
router.post('/depense', save) ;

/* Chiffre d'affaire mensuel */
router.get('/affaires/:mois/:annee', chiffreAffaireMensuel) ;

/* Valider un paiement */
router.put('/:id/paiement', paiement) ;

module.exports = router ;