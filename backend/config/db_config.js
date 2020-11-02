var mongoose = require( 'mongoose' );
var { mongodb_string } = require( './config' )

// mongoose.Promise = global.Promise;


mongoose.connect( mongodb_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    // useMongoClient: true
}, error => {
    if ( error ) {
        console.log( "Error Connecting to Mongo" );
    } else {
        console.log( "Connection to Database Successfull" );
    }
} )


module.exports = {
    mongoose
}