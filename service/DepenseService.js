const Depense = require('../models/Depense');
const { existById } = require('../service/TypedepenseService') ;

/* Liste de toutes les dépenses */
const find = async (req, res) => {
    const mois = req.params.mois ;
    const annee = req.params.annee ;
    if (isNaN(mois) || isNaN(annee) || mois <= 0 || annee <= 0 || mois > 12) sendResult(res, { 'error': 'Remplissez les champs correctement', 'body': req.body }) ;
    else {
        const result = await depenseMensuel(mois, annee) ;
        sendResult(res, result) ;
    }
} ;

/* Enregistrement d'une dépense */
const save = async (req, res) => {
    const error = await controle(req.body) ;
    if (error == '') {
        const depense = new Depense({'datedepense': req.body.datedepense, 'typedepense': req.body.typedepense, 'montant': req.body.montant, 'description': req.body.description}) ;
        await depense.save() ;
        sendResult(res, { 'success': 'Votre dépense a été sauvegardée avec succés', 'body': depense }) ;
    } else sendResult(res, { 'error': error, 'body': req.body }) ;
} ;

/*************
 * FUNCTIONS *
 ************/
/* Liste des dépenses du mois et de l'année */
async function depenseMensuel(mois, annee) {
    const depenses = await getDepenseMensuel(mois, annee) ;
    let total = 0 ;
    for (let depense of depenses) total += depense.montant ;
    return {
        'mois': mois ,
        'annee': annee ,
        'total': total ,
        'depenses': depenses 
    } ;
}

async function getDepenseMensuel(mois, annee) {
    const result = await Depense.find({
        $expr: {
          $and: [
            {
              "$eq": [
                {
                  "$month": "$datedepense"
                },
                mois
              ]
            },
            {
              "$eq": [
                {
                  "$year": "$datedepense"
                },
                annee
              ]
            }
          ]
        }
      }).populate('typedepense').exec() ;
    return result ;
}

/* Contrôle */
async function controle(body) {
    if (body.datedepense == '' || body.datedepense == null) return 'Date invalide' ;
    if (body.montant == '' || isNaN(body.montant) || body.montant < 0) return 'Montant de la dépense invalide' ;
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