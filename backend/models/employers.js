const mongoose = require( 'mongoose' )
var Schema = mongoose.Schema;

var employerSchema = new Schema( {
    //
}
    , { collection: 'employers' }
);

module.exports = mongoose.model( 'employerSchema', employerSchema );  