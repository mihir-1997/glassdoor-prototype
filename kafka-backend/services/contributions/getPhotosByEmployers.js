const contributionsSchema = require( '../../models/contributions' );


function handle_request ( msg, callback ) {
    let req = {
        params: msg
    }

    contributionsSchema.find( { $and: [ { "employerID": req.params.employerID }, { "type": "photos" } ] } ).then( doc => {

        callback( null, JSON.stringify( doc ) )
    } ).catch( error => {
        callback( error, null )
    } )




}

exports.handle_request = handle_request;