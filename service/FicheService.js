const { ObjectId } = require('mongodb');
const Fiche = require('../models/Fiche') ;

const { findByMatricule } = require('../service/VoitureService') ;
const EtatficheService = require('../service/EtatficheService') ;

/* Dépôt de voiture */
const depot = async(req, res) => {
    const matricule = req.body.matricule ;
    const voiture = await findByMatricule(matricule) ;
    if (voiture == null) sendResult(res, { 'error': 'Vous devez d\'abord enregistrer cette voiture', 'body': req.body}) ;
    else {
        const idvoiture = ObjectId(voiture._id) ;
        const iduser = ObjectId('63c15a750a5c84161b2e6201') ;
        const firstStep = await EtatficheService.firstStep() ;
        const datenow = new Date() ;
        const etat = {
            'etatfiche': ObjectId(firstStep._id) ,
            'dateetat': datenow
        } ;

        const fiche = new Fiche({'datefiche': datenow, 'voiture': idvoiture, 'user': iduser, 'etat': etat, 'reparations': [], 'etatpayement': 0 }) ;
        console.log(fiche) ;

        sendResult(res, fiche) ;
    }
} ;

/* Détails d'une fiche */
const fiche = async (req, res) => {
    const result = await Fiche.findOne({'_id': req.params.id}).populate('voiture').populate('etat.etatfiche').populate('user').exec() ;
    if (result == null) sendResult({'error': 'Cette fiche n\'existe pas', body: req.body}) ;
    else sendResult(result) ;
} ;

/* Liste des fiches (voitures) déposées et non-récéptionnées */
const listeDepotNonReception = async (req, res) => {
    const etat1 = req.params.etat1 ;
    const etat2 = req.params.etat2 ;

    Fiche.find().populate('etat.etatfiche').populate('voiture').populate('user')
        .where('etat.etatfiche.intitule').in([etat1])
        .where('etat.etatfiche.intitule').nin([etat2])
        .sort('etat.dateetat')
        .select('datefiche voiture etat').then((result) => sendResult(res, result)) ;
} ;

/****************
 * SEND GENERAL *
 ***************/
function sendResult(res, result) {
    res.status(200).json(result) ;
}

module.exports = {
    depot ,
    fiche ,
    listeDepotNonReception
}