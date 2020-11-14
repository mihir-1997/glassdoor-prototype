const mongoose = require( 'mongoose' )
var Schema = mongoose.Schema;

var reviewSchema = new Schema( {
    //

}
    , { collection: 'reviews' }
);

module.exports = mongoose.model( 'reviewSchema', reviewSchema );  