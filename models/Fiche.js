const mongoose = require("mongoose") ;
const Schema = mongoose.Schema ;
const ObjectId = require("mongodb").ObjectId ;

const FicheSchema = new Schema({
    datefiche: { type: Date, required: true } ,
    voiture: { type: ObjectId, ref: "Voiture", required: true } ,
    user: { type: ObjectId, ref: "User", required: true } ,
    etat: [{ 
        etatfiche: { type: ObjectId, ref: "Etatfiche", required: true } ,
        dateetat: { type: Date, required: true }
     }] ,
    reparations: [{
      intitule: { type: String, required: true } ,
      datedebut: { type: Date, required: false } ,
      datefin: { type: Date, required: false } ,
      avancement: { type: Number, required: true } ,
      prix: { type: Number, required: true } ,
      description: { type: String, required: false }
    }] ,
    etatpayement: { type: Number, required: true } ,
    datepayement : { type: Date, required: false }
}) ;

module.exports = mongoose.model("Fiche", FicheSchema) ;