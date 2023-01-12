const mongoose = require("mongoose") ;
const Schema = mongoose.Schema ;

const TypedepenseSchema = new Schema({
    _id: { type: String, required: true } ,
    intitule: { type: String, required: true }
}) ;

module.exports = mongoose.model("Typedepense", TypedepenseSchema);