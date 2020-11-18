const studentSchema = require( '../../models/students' );

function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }
    studentSchema.findOneAndUpdate( { _id: req.body.params.studentID },
        {
            $set: {
                aboutMe: req.body.aboutMe,
            }
        }, { new: true }
    ).then( response => {
        console.log( "Update successfull" )
        callback( null, response )
    } ).catch( error => {
        console.log( "Error in update", error )
        callback( error, null )
    } )








}



exports.handle_request = handle_request;