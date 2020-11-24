const contributionsSchema = require( '../../models/contributions' );


function handle_request ( msg, callback ) {
    let req = {
        params: msg
    }

    contributionsSchema.find( { $and: [ { "studentID": req.params.studentID }, { "type": "interview" } ] } ).then( doc => {

        callback( null, doc )
    } ).catch( error => {
        callback( error, null )
    } )




}

exports.handle_request = handle_request;