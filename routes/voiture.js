var express = require('express');
var router = express.Router();

const { save, find } = require('../service/VoitureService') ;

/* Enregistrement d'une nouvelle voiture */
router.post('/voiture', save) ;

/* Liste de tous les voitures */
router.get('/', find) ;

module.exports = router;