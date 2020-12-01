const studentSchema = require( '../../models/students' );


function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }

    studentSchema.update( { _id: req.body.params.studentID }
        , { $pull: { experience: { experienceID: req.body.experienceID } } }, { new: true }
    ).then( doc => {
        console.log( "Experience removed", doc )
        callback( null, doc )
        // res.status( 200 ).send( doc );
    } ).catch( error => {
        console.log( "error", error );
        callback( error, null )
        // res.status( 400 ).send( "Error following" );
    } )



}

exports.handle_request = handle_request;