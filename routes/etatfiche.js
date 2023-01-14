var express = require('express');
var router = express.Router();

const { save } = require('../service/EtatficheService') ;

/* Nouvelle fiche */
router.post('/etatfiche', save) ;