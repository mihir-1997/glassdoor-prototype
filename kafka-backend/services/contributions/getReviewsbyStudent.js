const contributionsSchema = require( '../../models/contributions' );

// var redis = require( 'redis' );
// var redisClient = redis.createClient();

// redisClient.on( 'connect', function () {
//     console.log( 'Redis client connected' );
// } );

// redisClient.on( 'error', function ( err ) {
//     console.log( 'Something went wrong while connecting redis' + err );
// } );

function handle_request ( msg, callback ) {
    let req = {
        params: msg
    }

    contributionsSchema.find( { $and: [ { "studentID": req.params.studentID }, { "type": "review" } ] } ).then( doc => {

        //redisClient.setex( req.params.studentID, 600, JSON.stringify( doc ) )
        callback( null, doc )
        //res.status( 200 ).send( doc );
    } ).catch( error => {
        callback( error, null )
        // res.status( 400 ).send( "Error getting" + error );
    } )




}

exports.handle_request = handle_request;