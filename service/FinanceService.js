const { chiffreAffaireMensuel } = require('../service/FicheService') ;
const { depenseMensuel } = require('../service/DepenseService') ;

/* Chiffre d'affaire journalière */
const affaireJournaliere = async (req, res) => {
    const mois = req.params.mois ;
    const annee = req.params.annee ;
    if (isNaN(mois) || isNaN(annee) || mois <= 0 || annee <= 0 || mois > 12) sendResult(res, { 'error': 'Remplissez les champs correctement', 'body': req.body }) ;
    else {
        const mensuel = await chiffreAffaireMensuel(mois, annee) ;
        let monthYearCalendar = createMonthYearCalendar(mois, annee) ;
        const fiches = mensuel.fiches ;
        for (const fiche of fiches) {
            const jour = fiche.datefiche.getDate() ;
            monthYearCalendar.calendar[jour - 1].total += fiche.montanttotal ;
            monthYearCalendar.calendar[jour - 1].fiches.push(fiche) ;
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
            'fiches': [] ,
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
    bilan ,
    affaireJournaliere
}