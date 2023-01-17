const { chiffreAffaireMensuel } = require('../service/FicheService') ;
const { depenseMensuel } = require('../service/DepenseService') ;

const bilan = async (req, res) => {
    const mois = req.params.mois ;
    const annee = req.params.annee ;
    if (isNaN(mois) || isNaN(annee) || mois <= 0 || annee <= 0 || mois > 12) sendResult(res, { 'error': 'Remplissez les champs correctement', 'body': req.body }) ;
    else {
        const affaires = await chiffreAffaireMensuel(mois, annee) ;
        const depenses = await depenseMensuel(mois, annee) ;
        const diff = affaires.total - depenses.total ;
        const result = {
            'mois': mois ,
            'annee': annee ,
            'affaires': affaires ,
            'depenses': depenses ,
            'benefice': (diff < 0 ? 0 : diff) ,
            'perte': (diff < 0 ? -diff : 0) ,
            'bilan': (diff < 0 ? 'Durant ce mois, vous avez subi une perte de '+(-diff)+' Ar' : 'Durant ce mois, vous avez obtenu une bénéfice de '+diff+' Ar')
        } ;
        sendResult(res, result) ;
    }
}

/****************
 * SEND GENERAL *
 ***************/
function sendResult(res, result) {
    res.status(200).json(result) ;
}

module.exports = {
    bilan
}