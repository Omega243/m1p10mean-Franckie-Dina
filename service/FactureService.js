const { ObjectId } = require('mongodb');
const Facture = require('../models/Facture') ;

// Enregistrement de facture
const saveFacture = async (fiche, montant, remise, datefacture) => {
    const montantpayer = (remise != 0 ? (montant * (1 - (remise / 100))) : montant ) ;
    const facture = new Facture({ 'fiche': ObjectId(fiche), 'montantapayer': montant, 'remise': remise, 'montantpayer': montantpayer, 'datefacture': datefacture }) ;
    facture.save() ;
} ;

module.exports = {
    saveFacture
}