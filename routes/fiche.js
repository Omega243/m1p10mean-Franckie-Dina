var express = require('express');
var router = express.Router();

const { depot, fiche, listeDepotNonReception } = require('../service/FicheService') ;

/* Dépôt de voiture */
router.post('/', depot) ;

/* Détails d'une fiche */
router.get('/fiche/:id', fiche) ;

/* Liste des fiches (voitures) déposées non-récéptionnées */
router.get('/depotnonreception', listeDepotNonReception) ;

module.exports = router;