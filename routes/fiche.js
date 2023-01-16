var express = require('express');
var router = express.Router();

const { historique, deleteEtat, deleteReparation, ficheUser, getNextStep, nextStep, depot, fiche, reparation } = require('../service/FicheService') ;

/**********
 * CLIENT *
 *********/
/* Dépôt de voiture */
router.post('/fiche', depot) ;

/* Historique de fiches pour un utilisateur et une voiture */
router.get('/users/:user/voitures/:voiture', historique) ;

/* Liste des fiches pour un utilisateur */
router.get('/users/:user', ficheUser) ;

/***********
 * ATELIER *
 **********/
/* Ajout de réparation */
router.post('/:id/reparation', reparation) ;

/* Ajouter la prochaine étape à une fiche */
router.put('/:id/next', nextStep) ;

/* Supprimer une réparation */
router.delete('/:id/reparations/:idreparation', deleteReparation) ;

/* Supprimer un état */
router.delete('/:id/etats/:idetat', deleteEtat) ;

/**********
 * COMMUN *
 *********/
/* Détails d'une fiche */
router.get('/:id', fiche) ;

/* Récupérer la prochaine étape d'une fiche */
router.get('/:id/next', getNextStep) ;


module.exports = router;