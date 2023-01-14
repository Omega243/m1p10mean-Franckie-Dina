const mongoose = require("mongoose") ;
const Schema = mongoose.Schema ;

const etatficheSchema = new Schema({
    intitule: { type: String, required: true } ,
    niveau: { type: Number, required: true } ,
    description: { type: String, required: false } ,
    envoimail: { type: String, required: false }
}) ;

module.exports = mongoose.model('Etatfiche', etatficheSchema) ;