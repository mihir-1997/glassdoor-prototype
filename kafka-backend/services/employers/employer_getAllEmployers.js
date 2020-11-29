const employerSchema = require( '../../models/employers' );

function handle_request ( msg, callback ) {
    let req = {
        params: msg
    }

    employerSchema.find( {} ).select( 'name website profileImageUrl ceoname' ).then( doc => {

        // console.log( "User", doc )
        callback( null, doc )
        // res.status( 200 ).send( JSON.stringify( doc ) )


    } ).catch( error => {
        console.log( "Error fetching all employers ", error )
        callback( error, null )
        // res.status( 400 ).send( "Error fetching user about" )
    } )








}



exports.handle_request = handle_request;