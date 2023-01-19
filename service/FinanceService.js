const { depenseMensuel } = require('../service/DepenseService') ;
const Facture = require('../models/Facture') ;

// Chiffre d'affaire mensuel
const chiffreAffaireMensuel = async (req, res) => {
    const mois = req.params.mois ;
    const annee = req.params.annee ;
    if (isNaN(mois) || isNaN(annee) || mois <= 0 || annee <= 0 || mois > 12) sendResult(res, { 'error': 'Remplissez les champs correctement', 'body': req.body }) ;
    else {
        const result = await chiffreMensuel(mois, annee) ;
        sendResult(res, result) ;
    }
} ;

async function chiffreMensuel(mois, annee) {
    const factures = await affaireMensuel(mois, annee) ;
    let total = 0 ;
    for (const facture of factures) total += facture.montantpayer ;
    const result = {
        'mois': mois ,
        'annee': annee ,
        'total': total ,
        'factures': factures
    } ;
    return result ;
}

async function affaireMensuel(mois, annee) {
    const factures = await Facture.find({
        $expr: {
            $and: [
              {
                "$eq": [
                  {
                    "$month": "$datefacture"
                  },
                  mois
                ]
              } ,
              {
                "$eq": [
                  {
                    "$year": "$datefacture"
                  },
                  annee
                ]
              }
            ]
          }
    }).populate('fiche').exec() ;
    return factures ;
} ;

/* Chiffre d'affaire journalière */
const chiffreAffaireJournaliere = async (req, res) => {
    const mois = req.params.mois ;
    const annee = req.params.annee ;
    if (isNaN(mois) || isNaN(annee) || mois <= 0 || annee <= 0 || mois > 12) sendResult(res, { 'error': 'Remplissez les champs correctement', 'body': req.body }) ;
    else {
        const factures = await affaireMensuel(mois, annee) ;
        let monthYearCalendar = createMonthYearCalendar(mois, annee) ;
        for (const facture of factures) {
            const jour = facture.datefacture.getDate() ;
            monthYearCalendar.calendar[jour - 1].total += facture.montantpayer ;
            monthYearCalendar.calendar[jour - 1].factures.push(facture) ;
        }
        sendResult(res, monthYearCalendar) ;
    }
} ;

function createMonthYearCalendar(month, year) {
    const allFinMois = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] ;
    const finMois = (month == 2 ? (year % 4 == 0 ? 29 : 28) : allFinMois[month - 1] ) ;
    let calendar = [] ;
    for (let i=0; i<finMois; i++) {
        calendar.push({
            'factures': [] ,
            'total': 0
        }) ;
    }
    return {
        'mois': month ,
        'annee': year ,
        'calendar': calendar
    } ;
}

/* Bilan mensuel */
const bilan = async (req, res) => {
console.log('Your are in BILAN FUNCTION') ;
    const mois = req.params.mois ;
    const annee = req.params.annee ;
    if (isNaN(mois) || isNaN(annee) || mois <= 0 || annee <= 0 || mois > 12) sendResult(res, { 'error': 'Remplissez les champs correctement', 'body': req.body }) ;
    else {
        const affaires = await chiffreMensuel(mois, annee) ;
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
    bilan ,
    chiffreAffaireJournaliere ,
    chiffreAffaireMensuel
}