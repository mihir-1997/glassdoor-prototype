const employerSchema = require( '../../models/employers' );

function handle_request ( msg, callback ) {
    let req = {
        params: msg
    }

    employerSchema.findOne( { _id: req.params.employerId } ).then( doc => {

        // console.log( "User", doc )
        callback( null, doc )
        // res.status( 200 ).send( JSON.stringify( doc ) )


    } ).catch( error => {
        console.log( "Error fetching employer by id ", error )
        callback( error, null )
        // res.status( 400 ).send( "Error fetching user about" )
    } )








}



exports.handle_request = handle_request;