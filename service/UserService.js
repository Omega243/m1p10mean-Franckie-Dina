const User = require('../models/User') ;
const roleService = require('../service/RoleService') ;

const jwt = require('jsonwebtoken') ;
const BCrypt = require('bcrypt') ;

const SECRET_KEY = 'MEAN' ;

/* LOGIN */
const login = async (req, res) => {
    // Récupération des données
    const mail = req.body.mail ;
    const mdp = req.body.mdp ;

    // Contrôle
    if (!mail || !mdp) sendResult(res, { 'error': 'Erreur d\'authentification', 'body': req.body }) ;
    else {
        const user = await logByMail(mail) ;
        if (user != null) {
            const correctMdp = await BCrypt.compare(mdp, user.mdp) ;
            if (correctMdp) {
                const token = jwt.sign({ mail: user.mail, id: user._id, datelogin: new Date().toString() }, SECRET_KEY) ;
                const intitule = user.nom+' '+user.prenom ;
                sendResult(res, { 'token': token, 'role': user.role, 'intitule': intitule }) ;
            } else sendResult(res, { 'error': 'Erreur d\'authentification', 'body': req.body }) ; 
        } else sendResult(res, { 'error': 'Adresse mail invalide', 'body': req.body }) ;
    }
} ;

/* INSCRIPTION */
const inscription = async (req, res) => {
    // Récupération du rôle du client
    const rc = await roleService.roleClient().then((result) => { return result } ) ;

    // Récupération de la contenue du Body
    const nom = req.body.nom ;
    const prenom = req.body.prenom ;
    const mail = req.body.mail ;
    const contact = req.body.contact ;
    const mdp = req.body.mdp ;
    const role = rc._id ;

    // Instanciation d'un USER
    const user = new User({nom: nom, prenom: prenom, mail: mail, mdp: mdp, contact: contact, role: role}) ;

    // Contrôle unitaire et mail
    let error = controleUnitaire(user) ;
    if (error !== '') sendResult(res, { 'error': error, 'body': req.body }) ;
    else {
        const valid = await mailNotExist(user.mail) ;
        if (valid) {
            user.mdp = await BCrypt.hash(req.body.mdp, 10) ;
            user.save() ;
            sendResult(res, {'success': 'Inscription efféctuée avec succés', 'body': user}) ;
        } else sendResult(res, {'error': 'Cette adresse mail est déjà utilisée', 'body': req.body}) ;
    }
} ;

/* LOGOUT */
const logout = async (req, res) => {
    sendResult({ 'success': 'User logged out', 'body': req.body }) ;
} ;

/*************
 * FUNCTIONS *
 ************/
// Contrôle inscription
function controleUnitaire(user) {
    let error = '' ;
    if (!user.nom || user.nom === '') error = 'Nom invalide' ;
    if (!user.prenom || user.prenom === '') error = 'Prenom invalide' ;
    if (!user.mail || user.mail === '') error = 'Mail invalide' ;
    if (!user.mdp || user.mdp === '') error = 'Mot de passe invalide' ;
    if (!user.contact || user.contact === '') error = 'Contact invalide' ;
    return error ;
}

// Récupération de l'utilisateur
async function logByMail(mail) {
    return User.findOne({mail: mail}).populate('role').then((result) => { return result ; }) ; 
}

// Controle mail existant
async function mailNotExist(mail) {
    return (User.find({mail: mail}).count().then((result) => { return result == 0 ; })) ;
}

// Contrôle id existante
async function idNotExist(id) {
    return (User.find({'_id': id}).count().then((result) => { return result == 0 ; })) ;
}

/****************
 * SEND GENERAL *
 ***************/
function sendResult(res, result) {
    res.status(200).json(result) ;
}

module.exports = {
    login ,
    inscription ,
    logout ,
    idNotExist
}