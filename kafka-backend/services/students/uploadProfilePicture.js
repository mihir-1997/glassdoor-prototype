const studentsSchema = require( '../../models/students' );



function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }

    studentsSchema.findByIdAndUpdate( { _id: req.body.params.studentID },
        { $set: { profilePicture: req.body.file.filename } }, { new: true }
    ).then( response => {
        callback( null, response )
    } ).catch( error => {
        callback( error, null )
    } )


}

exports.handle_request = handle_request;