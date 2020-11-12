const mongoose = require( 'mongoose' )
var Schema = mongoose.Schema;

var contributionSchema = new Schema( {
    //

}
    , { collection: 'contributions' }
);

module.exports = mongoose.model( 'contributionSchema', contributionSchema );  