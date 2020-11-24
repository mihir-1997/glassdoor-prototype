const contributionsSchema = require( '../../models/contributions' );


function handle_request ( msg, callback ) {
    let req = {
        params: msg
    }

    contributionsSchema.find( { $and: [ { "studentID": req.params.studentID }, { "type": "salary" } ] } ).then( doc => {

        callback( null, JSON.stringify( doc ) )
    } ).catch( error => {
        callback( error, null )
    } )




}

exports.handle_request = handle_request;