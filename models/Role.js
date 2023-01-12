const mongoose = require("mongoose") ;
const Schema = mongoose.Schema ;

const RoleSchema = new Schema({
    _id: { type: String, required: true },
    intitule: { type: String, required: true }
}) ;

module.exports = mongoose.model("Role", RoleSchema) ;