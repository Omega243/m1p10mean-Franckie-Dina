const { ObjectId } = require('mongodb');
const Fiche = require('../models/Fiche') ;

const { findByMatricule } = require('../service/VoitureService') ;
const { idNotExist } = require('../service/UserService') ;
const { sendMail } = require('../service/mailService') ;
const { saveFacture } = require('../service/FactureService') ;
const EtatficheService = require('../service/EtatficheService') ;

/* Recherche */
const recherche = async (req, res) => {
    const body = req.body ;
    const contraintes = {
        $and: [
            {
                'datefiche': { $gte: body.datedepotinf, $lte: body.datedepotsup }
            } ,
            {
                $or: [
                    {
                        'reparations.intitule': { '$regex': body.reparation, $options: 'i' }
                    } ,
                    {
                        'reparations.description': { '$regex': body.reparation, $options: 'i' }
                    }
                ]
            }
        ]
    } ;
    Fiche.find(contraintes).populate('voiture').exec().then((result) => {
        // Filtre par matricule de véhicule && Etat de payement
        if (body.matricule != '' || body.etatpayement != '') {
            for (let i=0; i<result.length; i++) {
                if (body.matricule != '' && result[i].voiture.matricule != body.matricule) {
                    result.splice(i, 1) ;
                    i-- ;
                }
                if (body.etatpayement != '' && result[i].etatpayement != body.etatpayement) {
                    result.splice(i, 1) ;
                    i-- ;
                }
            }
        }
        sendResult(res, result) ;
    }) ;
} ;

/* Liste des voitures (Fiche) pouvant être récupérée */
const vehiculeARecupere = async (req, res) => {
    const niveauArecupere = 5 ;
    const fiches = await Fiche.find({ 'user': req.params.iduser }).populate('user').populate('voiture').populate('etat.etatfiche').exec() ;
    const result = getWhereCurrentNiveauEqual(niveauArecupere, fiches) ;
    sendResult(res, result) ;
} ;

/* Liste des voitures déposées non-récéptionnées */
const deposeNonReceptionne = async (req, res) => {
    const fiches = await Fiche.find().populate('user').populate('voiture').populate('etat.etatfiche').exec() ;
    const result = getWhereCurrentNiveauEqual(0, fiches) ;
    sendResult(res, result) ;
} ;

/* Modification d'une réparation */
const updateReparation = async (req, res) => {
    const fiche = await Fiche.findOne({ '_id': req.params.id }).exec() ;
    if (fiche != null) {
        const reparat = {
            'intitule': req.body.intitule ,
            'datedebut': req.body.datedebut ,
            'datefin': req.body.datefin ,
            'avancement': req.body.avancement ,
            'prix': req.body.prix ,
            'description': req.body.description 
        } ;
        const error = controleReparation(reparat) ;
        if (error === '') {
            let find = false ;
            for (let i=0; i<fiche.reparations.length; i++) {
                if (fiche.reparations[i]._id == req.params.idreparation) {
                    fiche.reparations[i].intitule = reparat.intitule ;
                    fiche.reparations[i].datedebut = reparat.datedebut ;
                    fiche.reparations[i].datefin = reparat.datefin ;
                    fiche.reparations[i].avancement = reparat.avancement ;
                    fiche.reparations[i].prix = reparat.prix ;
                    fiche.reparations[i].description = reparat.description ;
    
                    find = true ;
                    await fiche.save() ;
                    break ;
                }
            }
            if (find) {
                await fiche.save() ;
                sendResult(res, { 'success': 'Réparation modifiée avec succés', 'body': fiche }) ;
            } else sendResult(res, { 'error': 'Cette réparation n\'existe pas', 'body': fiche }) ;
        } else sendResult(res, { 'error': error, 'body': req.body }) ;
    } else sendResult(res, { 'error': 'Cette fiche n\'existe pas', 'body': req.body }) ;
} ;

/* Valider paiement */
const paiement = async (req, res) => {
    if (req.body.remise < 0 || req.body.remise > 100) sendResult(res, { 'error': 'Votre remise est incorrecte', 'body': req.body }) ;
    else {
        const fiche = await Fiche.findOne({ '_id': req.params.id }).exec() ;
        if (fiche.etatpayement == 1) sendResult(res, { 'error': 'Cette fiche est déjà payée', 'body': req.body }) ;
        else {
            // Enregistrement de la facture
            const remise = (req.body.remise == '' ? 0 : req.body.remise) ;
            const montant = getMontantTotal(fiche) ;
            saveFacture(req.params.id, montant, remise) ;

            // Modification de l'état de paiement de la fiche
            fiche.etatpayement = 1 ;
            fiche.datepayement = new Date() ;
            await fiche.save() ;

            sendResult(res, { 'success': 'Validation de paiement effectuée avec succés ce : '+fiche.datepayement, 'body': fiche }) ;
        }
    }
} ;

/* Historique de fiche pour une voiture */
const historique = async (req, res) => {
    const result = await Fiche.find({ 'user': ObjectId(req.params.user), 'voiture': ObjectId(req.params.voiture) }).populate('user').populate('voiture').populate('etat.etatfiche').sort('etat.etatfiche.niveau').exec() ;
    const fiches = getFiches(result) ;
    sendResult(res, fiches) ;
} ;

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
    const result = await Fiche.find({ 'user': ObjectId(req.params.user) }).populate('user').populate('voiture').populate('etat.etatfiche').sort('etat.etatfiche.niveau').exec() ;
    const fiches = getFiches(result) ;
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
        if (nextStep.envoimail !== '') sendMail(fiche.user.mail, nextStep.envoimail) ;
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
// Filter depuis fiches les fiches dont le niveau en cours est niveau
function getWhereCurrentNiveauEqual(niveau, fiches) {
    let result = [] ;
    for (const fiche of fiches) {
        const lastEtat = fiche.etat[fiche.etat.length - 1] ;
        if (lastEtat.etatfiche.niveau == niveau) result.push(createFiche(fiche)) ;
    }
    return result ;
}

// Création des fiche [Affichage Liste]
function getFiches(result) {
    let fiches = [] ;
    for (const res of result) fiches.push(createFiche(res)) ;
    return fiches ;
}

function createFiche(res) {
    return {
        '_id': res._id ,
        'datefiche': res.datefiche ,
        'voiture': res.voiture.matricule ,
        'user': res.user.nom+' '+res.user.prenom ,
        'nbrereparation': res.reparations.length ,
        'montanttotal': getMontantTotal(res) ,
        'etat': res.etat[res.etat.length - 1] ,
        'avancement': getAvancement(res) ,
        'etatpayement': res.etatpayement ,
        'tempsmoyenne': getTempsMoyenneReparation(res)
    } ;
}

// Récupérer le prochain état d'une fiche
async function nextEtat(id) {
    return Fiche.findOne({'_id': id}).sort({'etat.etatfiche.niveau': 1}).populate('etat.etatfiche').select('etat.etatfiche').exec().then(async (result) => {
        const indice = result.etat.length - 1 ;
        const etat = result.etat[indice] ;
        const nextNiveau = etat.etatfiche.niveau + 1 ;
        const nextState = await EtatficheService.findByNiveau(nextNiveau) ;
        return nextState ;
    }) ;
}

/* Temps de répération moyenne pour une fiche */
function getTempsMoyenneReparation(fiche) {
    let tempsTotal = 0 ;
    for (const reparation of fiche.reparations) {
        if (reparation.datedebut != '' && reparation.datefin != '') tempsTotal += reparation.datefin.getTime() - reparation.datedebut.getTime() ;
    }
    const nbreReparation = fiche.reparations.length ;
    const tempsMoyenne = (nbreReparation == 0 ? 0 : tempsTotal / nbreReparation) ;
    return msConversion(tempsMoyenne) ;
}

function msConversion(millis) {
    let sec = Math.floor(millis / 1000);
    let hrs = Math.floor(sec / 3600);
    sec -= hrs * 3600;
    let min = Math.floor(sec / 60);
    sec -= min * 60;
  
    sec = '' + sec;
    sec = ('00' + sec).substring(sec.length);
  
    if (hrs > 0) {
      min = '' + min;
      min = ('00' + min).substring(min.length);
      return hrs + ":" + min + ":" + sec;
    }
    else {
      return min + ":" + sec;
    }
}

// Pourcentage d'avancement d'une fiche
function getMontantTotal(fiche) {
    let result = 0 ;
    for (const reparation of fiche.reparations) result += reparation.prix ;
    return result ;
}

function getAvancement(fiche) {
    let total = 0 ;
    for (const rep of fiche.reparations) total += rep.avancement ;
    return (fiche.reparations.length == 0 ? 100 : total / fiche.reparations.length) ;
}

// Controle de nouvel réparation
function controleReparation(reparat) {
    if (reparat.intitule === '' || !reparat.intitule) return 'Veuillez remplir le champ intitule' ;
    if (!reparat.prix || reparat.prix === '' || isNaN(reparat.prix) || reparat.prix < 0) return 'Votre prix est incorrect' ;
    if (reparat.datedebut != null && reparat.datefin != null && reparat.datedebut != '' && reparat.datefin != '' && (new Date(reparat.datedebut).getTime() > new Date(reparat.datefin).getTime())) return 'Date invalide' ;
    return '' ;
}

/****************
 * SEND GENERAL *
 ***************/
function sendResult(res, result) {
    res.status(200).json(result) ;
}

module.exports = {
    recherche ,
    vehiculeARecupere ,
    deposeNonReceptionne ,
    updateReparation ,
    paiement ,
    historique ,
    deleteEtat ,
    deleteReparation ,
    ficheUser ,
    getNextStep ,
    nextStep ,
    depot ,
    fiche ,
    reparation
}