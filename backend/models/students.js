const mongoose = require( 'mongoose' )
var Schema = mongoose.Schema;

var studentSchema = new Schema( {
    //
}
    , { collection: 'students' }
);

module.exports = mongoose.model( 'studentSchema', studentSchema );  