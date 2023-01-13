const User = require('../models/User') ;
const roleClient = require('../service/RoleService') ;

const BCrypt = require('bcrypt') ;

const inscription = async (req, res) => {
    // Récupération du rôle du client
    const rc = await roleClient.roleClient().then((result) => { return result } ) ;

    // Récupération de la contenue du Body
    const nom = req.body.nom ;
    const prenom = req.body.prenom ;
    const mail = req.body.mail ;
    const contact = req.body.contact ;
    const mdp = req.body.mdp ;
    const role = rc._id ;

    // Instanciation d'un USER
    const user = new User({nom: nom, prenom: prenom, mail: mail, mdp: mdp, contact: contact, role: role}) ;

    // Contrôle unitaire
    let error = controleUnitaire(user) ;
    if (error !== '') {
        const result = {
            'error': error,
            'body': req.body
        } ;
        sendResult(res, result) ;
    } else {
        user.mdp = await BCrypt.hash(req.body.mdp, 10) ;
        valid = await isMailValid(user) ;
        if (valid) {
            user.save() ;
            sendResult(res, {'success': 'Inscription efféctuée avec succés', 'body': user}) ;
        } else sendResult(res, {'error': 'Cette adresse mail est déjà utilisée', 'body': req.body}) ;
    }
} ;

/*************
 * FUNCTIONS *
 ************/
function controleUnitaire(user) {
    let error = '' ;
    if (user.nom === '') error = 'Nom invalide' ;
    if (user.prenom === '') error = 'Prenom invalide' ;
    if (user.mail === '') error = 'Mail invalide' ;
    if (user.mdp === '') error = 'Mot de passe invalide' ;
    if (user.contact === '') error = 'Contact invalide' ;
    return error ;
}

async function isMailValid(user) {
    return (User.find({mail: user.mail}).count().then((result) => { return (result == 0) ; })) ;
}

/****************
 * SEND GENERAL *
 ***************/
function sendResult(res, result) {
    res.status(200).json(result) ;
}

module.exports = {
    inscription
}