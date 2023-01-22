var express = require('express');
var router = express.Router();

const { recapitule, recherche, vehiculeARecupere, deposeNonReceptionne, updateReparation, historique, deleteEtat, deleteReparation, ficheUser, getNextStep, nextStep, depot, fiche, reparation } = require('../service/FicheService') ;

/**********
 * CLIENT *
 *********/
/* Liste des voitures pouvant être récupérées */
router.get('/users/:iduser/recuperations', vehiculeARecupere) ;

/* Dépôt de voiture */
router.post('/fiche', depot) ;

/* Historique de fiches pour un utilisateur et une voiture */
router.get('/users/:user/voitures/:voiture', historique) ;

/* Liste des fiches pour un utilisateur */
router.get('/users/:user', ficheUser) ;

/***********
 * ATELIER *
 **********/
/* Liste des fiches déposées non-récéptionnées */
router.get('/deposes/non-receptionnes', deposeNonReceptionne) ;

/* Ajout de réparation */
router.post('/:id/reparation', reparation) ;

/* Modification d'une réparation */
router.put('/:id/reparations/:idreparation', updateReparation) ;

/* Ajouter la prochaine étape à une fiche */
router.put('/:id/next', nextStep) ;

/* Supprimer une réparation */
router.delete('/:id/reparations/:idreparation', deleteReparation) ;

/* Supprimer un état */
router.delete('/:id/etats/:idetat', deleteEtat) ;

/**********
 * COMMUN *
 *********/
/* Recherche */
router.get('/recherche/historique', recherche) ;

/* Récapitule */
router.get('/fiche/recapitulation/:id', recapitule) ;

/* Détails d'une fiche */
router.get('/:id', fiche) ;

/* Récupérer la prochaine étape d'une fiche */
router.get('/:id/next', getNextStep) ;


module.exports = router;