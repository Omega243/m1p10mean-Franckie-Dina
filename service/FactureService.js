const { ObjectId } = require('mongodb');
const Facture = require('../models/Facture') ;

const saveFacture = async (fiche, montant, remise) => {
    const montantpayer = (remise != 0 ? (montant * (1 - (remise / 100))) : montant ) ;
    const facture = new Facture({ 'fiche': ObjectId(fiche), 'montantapayer': montant, 'remise': remise, 'montantpayer': montantpayer, 'datefacture': new Date() }) ;
    facture.save() ;
} ;

module.exports = {
    saveFacture
}