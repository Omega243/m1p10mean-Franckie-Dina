const { ObjectId } = require('mongodb');
const Fiche = require('../models/Fiche') ;

const { findByMatricule } = require('../service/VoitureService') ;
const { idNotExist } = require('../service/UserService') ;
const { sendMail } = require('../service/mailService') ;
const EtatficheService = require('../service/EtatficheService') ;
const Etatfiche = require('../models/Etatfiche');

/* Supprimer une réparation d'une fiche */
const deleteEtat = async (req, res) => {
    let fiche = await Fiche.findOne({ '_id': req.params.id }).exec() ;
    if (fiche != null) {
        let find = false ;
        if (fiche.etat.length == 1) sendResult(res, { 'error': 'Une fiche doit posséder au moins un état', 'body': fiche }) ;
        else {
            for (let i=0; i<fiche.etat.length; i++) {
                if (fiche.etat[i]._id == req.params.idetat) {
                    fiche.etat.splice(i, 1) ;
                    find = true ;
                    break ;
                }
            }
            if (find) {
                await fiche.save() ;
                sendResult(res, { 'success': 'Etat supprimé avec succés', 'body': fiche }) ;
            } else sendResult(res, { 'error': 'Cette état n\'existe pas', 'body': fiche }) ;
        }
    } else sendResult(res, { 'error': 'Cette fiche n\'existe pas', 'body': req.body }) ;
} ;

/* Supprimer une réparation d'une fiche */
const deleteReparation = async (req, res) => {
    let fiche = await Fiche.findOne({ '_id': req.params.id }).exec() ;
    if (fiche != null) {
        let find = false ;
        for (let i=0; i<fiche.reparations.length; i++) {
            if (fiche.reparations[i]._id == req.params.idreparation) {
                fiche.reparations.splice(i, 1) ;
                find = true ;
                break ;
            }
        }
        if (find) {
            await fiche.save() ;
            sendResult(res, { 'success': 'Réparation supprimée avec succés', 'body': fiche }) ;
        } else sendResult(res, { 'error': 'Cette réparation n\'existe pas', 'body': fiche }) ;
    } else sendResult(res, { 'error': 'Cette fiche n\'existe pas', 'body': req.body }) ;
} ;

/* Liste des fiches pour un utilisateur */
const ficheUser = async (req, res) => {
    const result = await Fiche.find({ 'user': ObjectId(req.params.user) }).populate('voiture').populate('etat.etatfiche').sort('etat.etatfiche.niveau').exec() ;
    let fiches = [] ;
    for (const res of result) {
        fiches.push({
            '_id': res._id ,
            'datefiche': res.datefiche ,
            'voiture': res.voiture.matricule ,
            'nbrereparation': res.reparations.length ,
            'etat': res.etat[res.etat.length - 1] ,
            'avancement': getAvancement(res) ,
            'etatpayement': res.etatpayement
        }) ;
    }
    sendResult(res, fiches) ;
} ;

/* Ajouter la prochaine étape à une fiche */
const nextStep = async (req, res) => {
    const nextStep = await nextEtat(req.params.id) ;
    if (nextStep == null) sendResult(res, { 'error': 'Plus aucune action est possible', 'body': req.body }) ;
    else {
        const fiche = await Fiche.findOne({'_id': req.params.id}).populate('user').exec() ;
        fiche.etat.push({
            'etatfiche': ObjectId(nextStep._id),
            'dateetat': new Date() 
        }) ;
        if (nextStep.sendMail != '') sendMail(fiche.user.mail, nextStep.envoimail) ;
        await fiche.save() ;
        sendResult(res, { 'success': 'Succés, etat de la fiche : '+nextStep.intitule, 'body': fiche }) ;
    }
} ;

/* Récupérer la prochaine étape pour une fiche */
const getNextStep = async (req, res) => {
    const nextStep = await nextEtat(req.params.id) ;
    if (nextStep != null) sendResult(res, {'exist': 'Une étape supérieure est possible', 'body': nextStep}) ;
    else sendResult(res, {'notexist': 'Plus aucune action possible', 'body': nextStep}) ;
} ;

/* Ajout de réparation */
const reparation = async (req, res) => {
    // Récupération de la fiche
    const fiche = await Fiche.findOne({'_id': req.params.id}).exec() ;

    if (fiche != null) {
        const reparat = {
            'intitule': req.body.intitule ,
            'datedebut': req.body.datedebut ,
            'datefin': req.body.datefin ,
            'avancement': 0 ,
            'prix': req.body.prix ,
            'description': req.body.description
        } ;
        const error = controleReparation(reparat) ;
        if (error === '') {
            fiche.reparations.push(reparat) ;
            await fiche.save() ;
            sendResult(res, { 'success': 'Réparation ajoutée avec succés', 'body': fiche }) ;
        } else sendResult(res, { 'error': error, 'body': req.body }) ;
    } else sendResult(res, { 'error': 'Cette fiche n\'exite pas', 'body': req.body }) ;
} ;

/* Dépôt de voiture */
const depot = async(req, res) => {
    const voiture = await findByMatricule(req.body.matricule) ;
    if (voiture == null) sendResult(res, { 'error': 'Vous devez d\'abord enregistrer cette voiture', 'body': req.body}) ;
    else {
        const idNotE = await idNotExist(ObjectId(req.body.iduser)) ;
        if (idNotE) sendResult(res, { 'error': 'Erreur dans votre authentification', 'body': req.body }) ;
        else {
            const idvoiture = ObjectId(voiture._id) ;
            const iduser = ObjectId(req.body.iduser) ;
            const datenow = new Date() ;
            const firstStep = await EtatficheService.findByNiveau(0) ;
            const etat = {
                'etatfiche': ObjectId(firstStep._id) ,
                'dateetat': datenow
            } ;
            const fiche = new Fiche({'datefiche': datenow, 'voiture': idvoiture, 'user': iduser, 'etat': etat, 'reparations': [], 'etatpayement': 0, 'datepayement': null }) ;
            fiche.save() ;
            sendResult(res, { 'success': 'Voiture déposée et Fiche créée avec succés', 'body': fiche}) ;
        }
    }
} ;

/* Détails d'une fiche */
const fiche = async (req, res) => {
    const result = await Fiche.findOne({'_id': req.params.id}).populate('voiture').populate('etat.etatfiche').populate('user').exec() ;
    if (result == null) sendResult(res, {'error': 'Cette fiche n\'existe pas', body: req.body}) ;
    else sendResult(res, result) ;
} ;

/*************
 * FUNCTIONS *
 ************/
// Récupérer le prochain état d'une fiche
async function nextEtat(id) {
    return Fiche.findOne({'_id': id}).sort({'etat.dateetat': 0}).populate('etat.etatfiche').select('etat.etatfiche').exec().then(async (result) => {
        const indice = result.etat.length - 1 ;
        const etat = await result.etat[indice] ;
        const nextNiveau = etat.etatfiche.niveau + 1 ;
        const nextState = await EtatficheService.findByNiveau(nextNiveau) ;
        return nextState ;
    }) ;
}

// Pourcentage d'avancement d'une fiche
function getAvancement(fiche) {
    let total = 0 ;
    for (const rep of fiche.reparations) total += rep.avancement ;
    return (fiche.reparations.length == 0 ? 100 : total / fiche.reparations.length) ;
}

// Controle de nouvel réparation
function controleReparation(reparat) {
    console.log(reparat) ;
    if (reparat.intitule === '') return 'Veuillez remplir le champ intitule' ;
    if (reparat.prix === '' || isNaN(reparat.prix) || reparat.prix < 0) return 'Votre prix est incorrect' ;
    if (reparat.datedebut != null && reparat.datefin != null && (new Date(reparat.datedebut).getTime() > new Date(reparat.datefin).getTime())) return 'Date invalide' ;
    return '' ;
}

/****************
 * SEND GENERAL *
 ***************/
function sendResult(res, result) {
    res.status(200).json(result) ;
}

module.exports = {
    deleteEtat ,
    deleteReparation ,
    ficheUser ,
    getNextStep ,
    nextStep ,
    depot ,
    fiche ,
    reparation
}