const mongoose = require( 'mongoose' )
var Schema = mongoose.Schema;

var jobsSchema = new Schema( {
    //
}
    , { collection: 'jobs' }
);

module.exports = mongoose.model( 'jobsSchema', jobsSchema );  