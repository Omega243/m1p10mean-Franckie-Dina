const Etatfiche = require('../models/Etatfiche') ;

/* Enregistrement d'un nouvel état de Fiche */
const save = async(req, res) => {
    // Récupération des données
    const intitule = req.body.intitule ;
    const niveau = req.body.niveau ;

    // Contrôle des données
    const intituleNotE = await intituleNotExist(intitule) ;
    if (intituleNotE) {
        const niveauNotE = await niveauNotExist(niveau) ;
        if (niveauNotE) {
            new Etatfiche({'intitule': intitule, 'niveau': niveau, 'description': req.body.description}).save() ;
            sendResult(res, {'success': 'Enregistrement effectué avec succés', 'body': req.body}) ;
        } else sendResult(res, {'error': 'Ce niveau existe déjà', 'body': req.body}) ;
    } else {
        sendResult(res, {'error': 'Cette état existe déjà', 'body': req.body}) ;
    }
}

/* Récupération du premier Etat d'une Fiche */
const firstStep = async () => {
    return Etatfiche.find({ 'niveau': 0 }).then((result) => { return result }) ;
}

/*************
 * FUNCTIONS *
 ************/
/* Contrôle si l'intitule existe déjà */
function intituleNotExist(intitule) {
    return Etatfiche.find({ 'intitule': intitule}).count().then((result) => { return result == 0 }) ;
}

/* Contrôle si le niveau existe déjà */
function niveauNotExist(niveau) {
    return Etatfiche.find({ 'niveau': niveau }).count().then((result) => { return result == 0 }) ;
}

/****************
 * SEND GENERAL *
 ***************/
function sendResult(res, result) {
    res.status(200).json(result) ;
}

module.exports = {
    save ,
    firstStep
}