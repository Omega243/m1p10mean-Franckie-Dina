const Typedepense = require('../models/Typedepense') ;

const find = async (req, res) => {
    const result = await Typedepense.find().exec() ;
    sendResult(res, result) ;
} ;

const save = async (req, res) => {
    const intitule = req.body.intitule ;
    if (intitule === '') sendResult(res, { 'error': 'Veuillez remplir les champs correctement', 'body': req.body }) ;
    else {
        const intituleE = await intituleExist(intitule) ;
        if (intituleE) sendResult(res, { 'error': 'Ce type de dépense existe déjà', 'body': req.body }) ;
        else {
            const type = new Typedepense({ 'intitule': intitule, 'description': req.body.description }) ;
            await type.save() ;
            sendResult(res, { 'success': 'Type de dépense enregistré avec succés', 'body': type }) ;
        }
    }
} ;

/*************
 * FUNCTIONS *
 ************/
/* Contrôle de l'intitule */
function intituleExist(intitule) {
    return Typedepense.findOne( {'intitule': intitule} ).count().exec().then((result) => { return result > 0 ; }) ;
}

/* Exist by ID */
const existById = async (id) => {
    return Typedepense.find( {'_id': id} ).count().exec().then((result) => { return result == 1 ; }) ;
} ;

/****************
 * SEND GENERAL *
 ***************/
function sendResult(res, result) {
    res.status(200).json(result) ;
}

module.exports = {
    find ,
    save ,
    existById ,
} ;