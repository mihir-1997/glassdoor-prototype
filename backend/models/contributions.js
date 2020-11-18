const mongoose = require( 'mongoose' )
var Schema = mongoose.Schema;

var contributionSchema = new Schema( {
    type: String

}, { strict: false },
    { collection: 'contributions' },

);

module.exports = mongoose.model( 'contributions', contributionSchema );  