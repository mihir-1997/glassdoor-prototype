const studentSchema = require( '../../models/students' );

function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }
    studentSchema.findOneAndUpdate( { _id: req.body.params.studentID },
        {
            $set: {
                skills: req.body.skills,
            }
        }, { new: true }
    ).then( response => {
        console.log( "Skill Update successfull" )
        callback( null, response )
    } ).catch( error => {
        console.log( "Error in update", error )
        callback( error, null )
    } )








}



exports.handle_request = handle_request;