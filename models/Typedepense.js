const mongoose = require("mongoose") ;
const Schema = mongoose.Schema ;

const TypedepenseSchema = new Schema({
    intitule: { type: String, required: true } ,
    description : { type: String, required: false }
}) ;

module.exports = mongoose.model("Typedepense", TypedepenseSchema);