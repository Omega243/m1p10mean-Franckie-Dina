const Etatfiche = require('../models/Etatfiche') ;

/* Récupération de la liste des états d'une fiche */
const find = async (req, res) => {
    Etatfiche.find({}).then((result) => sendResult(res, result)) ;
} ;

/* Enregistrement d'un nouvel état de Fiche */
const save = async(req, res) => {
    // Récupération des données
    const intitule = req.body.intitule ;
    const niveau = req.body.niveau ;

    // Contrôles unitaire des données
    if (intitule === '' || niveau === '' || isNaN(niveau)) sendResult(res, { 'error': 'Veuillez remplir correctement les champs', 'body': req.body }) ;
    else { 
        // Contrôles secondaires des données
        const intituleNotE = await intituleNotExist(intitule) ;
        if (intituleNotE) {
            const niveauNotE = await niveauNotExist(niveau) ;
            if (niveauNotE) {
                new Etatfiche({'intitule': intitule, 'niveau': niveau, 'description': req.body.description, 'envoimail': req.body.envoimail}).save() ;
                sendResult(res, {'success': 'Enregistrement effectué avec succés', 'body': req.body}) ;
            } else sendResult(res, {'error': 'Ce niveau existe déjà', 'body': req.body}) ;
        } else {
            sendResult(res, {'error': 'Cette état existe déjà', 'body': req.body}) ;
        }
    }
}

/*************
 * FUNCTIONS *
 ************/
/* Récupération d'un état à partir d'un niveau */
const findByNiveau = async (niveau) => {
    return Etatfiche.findOne({ 'niveau': niveau}).exec() ;
}

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
    find ,
    save ,
    findByNiveau
}