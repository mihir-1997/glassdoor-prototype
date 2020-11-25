const jobSchema = require( '../../models/jobs' );

function handle_request ( msg, callback ) {
    let req = {
        params: msg
    }

    jobSchema.find( { title: new RegExp(req.params.title, 'i')  } ).sort('employerName').then( doc => {

        // console.log( "User", doc )
        callback( null, doc )
        // res.status( 200 ).send( JSON.stringify( doc ) )


    } ).catch( error => {
        console.log( "Error fetching jobs by title ", error )
        callback( error, null )
        // res.status( 400 ).send( "Error fetching user about" )
    } )








}



exports.handle_request = handle_request;