const mongoose = require("mongoose") ;
const Schema = mongoose.Schema ;
const ObjectId = require("mongodb").ObjectId ;

const FactureShcema = new Schema({
    fiche: { type: ObjectId, ref: "Fiche", required: true } ,
    montantapayer: { type: Number, required: true } ,
    remise: { type: Number, required: true } ,
    montantpayerr: { type: Number, required: true } ,
    datefacture: { type: Date, required: true }
}) ;

module.exports = mongoose.model("Facture", FactureShcema) ;