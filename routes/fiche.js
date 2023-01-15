var express = require('express');
var router = express.Router();

const { deleteEtat, deleteReparation, ficheUser, getNextStep, nextStep, depot, fiche, reparation } = require('../service/FicheService') ;

/* Liste des fiches pour un utilisateur */
router.get('/users/:user', ficheUser) ;

/* Détails d'une fiche */
router.get('/:id', fiche) ;

/* Dépôt de voiture */
router.post('/fiche', depot) ;

/* Ajout de réparation */
router.post('/:id/reparation', reparation) ;

/* Récupérer la prochaine étape d'une fiche */
router.get('/:id/next', getNextStep) ;

/* Supprimer une réparation */
router.delete('/:id/reparations/:idreparation', deleteReparation) ;

/* Supprimer un état */
router.delete('/:id/etats/:idetat', deleteEtat) ;

/* Ajouter la prochaine étape à une fiche */
router.put('/:id/next', nextStep) ;


module.exports = router;