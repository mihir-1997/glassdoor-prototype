var mongoose = require( 'mongoose' );
var { mongodb_string, mysql_url, mysql_database, mysql_password, mysql_username } = require( './config' )
var mysql = require( 'mysql' )

var connection = mysql.createConnection( {
    host: mysql_url,
    user: mysql_username,
    password: mysql_password,
    database: mysql_database
} )

//establishing connecting to database
connection.connect( ( error ) => {
    if ( error ) {
        return console.log( "Connection Failed", error );
    }
    console.log( "Connection to RDS-MYSQL Successful" );
} );


// mongoose.Promise = global.Promise;


mongoose.connect( mongodb_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    // useMongoClient: true
}, error => {
    if ( error ) {
        console.log( "Error Connecting to Mongo" );
    } else {
        console.log( "Connection to MongoDB Successfull" );
    }
} )


module.exports = {
    mongoose: mongoose,
    connection: connection
}