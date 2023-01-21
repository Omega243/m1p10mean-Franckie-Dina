const Voiture = require('../models/Voiture') ;

/* Nouvelle voiture */
const save = async (req, res) => {
    // Récupération des données
    const matricule = req.body.matricule ;
    const marque = req.body.marque ;
    const type = req.body.type ;

    // Contrôle unitaire
    if (!matricule) sendResult(res, { 'error': 'Le champ matricule est obligatoire', 'body': req.body })
    else {
        const matriculeNotE = await matriculeNotExist(matricule) ;
        if (matriculeNotE) {
            if (!marque || !type || marque === '' || type === '') sendResult(res, { 'error': 'Veuillez compléter les champs', 'body': req.body }) ;
            else {
                new Voiture({matricule: matricule, marque: marque, type: type}).save() ;
                sendResult(res, { 'success': 'Enregistrement effectué avec succés', 'body': req.body }) ;
            }
        } else sendResult(res, { 'error': 'Cette matricule est déjà utilisé', 'body': req.body }) ;
    }
} ;

/* Liste de tous les voitures */
const find = async (req, res) => {
    Voiture.find({}).then((result) => sendResult(res, result)) ;
} ;

/*************
 * FUNCTIONS *
 ************/
/* Récupération à partir du numéro matricule */
function findByMatricule(matricule) {
    return Voiture.findOne({'matricule': matricule}).then((result) => { return result ; }) ;
}

/* Contrôle Nouvelle voiture */
function matriculeNotExist(matricule) {
    return Voiture.findOne({'matricule': matricule}).count().then((result) => { return result == 0 ; }) ;
}

/****************
 * SEND GENERAL *
 ***************/
function sendResult(res, result) {
    res.status(200).json(result) ;
}

module.exports = {
    save ,
    find ,
    findByMatricule
}