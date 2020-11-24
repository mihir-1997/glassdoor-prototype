const contributionsSchema = require( '../../models/contributions' );


function handle_request ( msg, callback ) {
    let req = {
        params: msg
    }

    contributionsSchema.find( { $and: [ { "studentID": req.params.studentID }, { "type": "photos" } ] }
    ).then( doc => {
        console.log( "in doc", doc )
        callback( null, JSON.stringify( doc ) )
    } ).catch( error => {
        console.log( error )
        callback( error, null )
    } )




}

exports.handle_request = handle_request;