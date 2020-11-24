const employerSchema = require( '../../models/employers' );



function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }

    employerSchema.findByIdAndUpdate( { _id: req.body.params.employerID },
        { $set: {  profileImageUrl: req.body.file.filename } }, { new: true }
    ).then( response => {
        callback( null, response )
    } ).catch( error => {
        callback( error, null )
    } )


}

exports.handle_request = handle_request;