const mongoose = require("mongoose") ;
const Schema = mongoose.Schema ;

const VoitureSchema = new Schema({
    _id: { type: String, required: true } ,
    matricule: { type: String, required: true } ,
    marque: { type: String, required: true } ,
    type: { type: String, required: true }
}) ;

module.exports = mongoose.model("Voiture", VoitureSchema) ;