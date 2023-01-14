const { ObjectId } = require('mongodb');
const Fiche = require('../models/Fiche') ;

const { findByMatricule } = require('../service/VoitureService') ;
const { idNotExist } = require('../service/UserService') ;
const { sendMail } = require('../service/mailService') ;
const EtatficheService = require('../service/EtatficheService') ;

/* Liste des fiches pour un utilisateur */
const ficheUser = async (req, res) => {
    const result = await Fiche.find({ 'user': ObjectId(req.params.user) }).populate('voiture').populate('etat').sort('etat.etatfiche.niveau').exec() ;
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
        fiche.save() ;
        if (nextStep.sendMail != '') sendMail(fiche.user.mail, nextStep.sendMail) ;
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
            'prix': req.body.prix ,
            'description': req.body.description
        } ;
        const error = controleReparation(reparat) ;
        if (error === '') {
            fiche.reparations.push(reparat) ;
            fiche.save() ;
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

/* Liste des fiches (voitures) déposées et non-récéptionnées */
const listeDepotNonReception = async (req, res) => {
    const etat1 = req.params.etat1 ;
    const etat2 = req.params.etat2 ;

    Fiche.find().populate('etat.etatfiche').populate('voiture').populate('user')
        .where('etat.etatfiche.intitule').in([etat1])
        .where('etat.etatfiche.intitule').nin([etat2])
        .sort('etat.dateetat')
        .select('datefiche voiture etat').then((result) => sendResult(res, result)) ;
} ;

/*************
 * FUNCTIONS *
 ************/
// Pourcentage d'avancement d'une fiche
function getAvancement(fiche) {
    let total = 0 ;
    for (const rep of fiche.reparations) total += rep.avancement ;
    return (fiche.reparations.length == 0 ? 100 : total / fiche.reparations.length) ;
}

// Récupérer le prochain état d'une fiche
function nextEtat(id) {
    const currentStepLevel = Fiche.findOne({'_id': id}).populate('etat.etatfiche').select('etat.etatfiche.niveau').exec() ;
    return EtatficheService.findByNiveau(currentStepLevel.etat.etatfiche.niveau + 1) ;
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
    ficheUser ,
    getNextStep ,
    nextStep ,
    depot ,
    fiche ,
    reparation
}