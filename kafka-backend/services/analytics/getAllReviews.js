const contributionsSchema = require( '../../models/contributions' );


function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }
    contributionsSchema.find( { "type": "review" } ).then( docs => {

        callback( null, JSON.stringify( docs ) )

    } ).catch( error => {
        callback( error, null )
    } )





}

exports.handle_request = handle_request;