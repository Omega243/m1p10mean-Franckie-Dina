const Depense = require('../models/Depense');
const { existById } = require('../service/TypedepenseService') ;

/* Liste de toutes les dépenses */
const find = async (req, res) => {
    const result = await Depense.find().exec() ;
    sendResult(res, result) ;
} ;

/* Enregistrement d'une dépense */
const save = async (req, res) => {
    const error = controle(req.body) ;
    if (controle == '') {
        const depense = new Depense({'datedepense': req.body.datedepense, 'typedepense': req.body.typedepense, 'montant': req.body.montant, 'description': req.body.description}) ;
        await depense.save() ;
        sendResult(res, { 'success': 'Votre dépense a été sauvegardée avec succés', 'body': depense }) ;
    } else sendResult(res, { 'error': error, 'body': req.body }) ;
} ;

/*************
 * FUNCTIONS *
 ************/
async function controle(body) {
    if (body.datedepense == '' || body.datedepense == null) return 'Date invalide' ;
    if (body.montant == '' || !isNaN(body.montant) || body.montant < 0) return 'Montant de la dépense invalide' ;
    const existbyid = await existById(body.typedepense) ;
    if (!existbyid) return 'Ce type de dépense n\'existe pas' ;
    return '' ;
}

/****************
 * SEND GENERAL *
 ***************/
function sendResult(res, result) {
    res.status(200).json(result) ;
}

module.exports = {
    find ,
    save
}