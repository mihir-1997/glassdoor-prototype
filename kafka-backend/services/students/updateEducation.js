const studentSchema = require( '../../models/students' );


function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }

    let updatedEducation = {
        educationID: req.body.educationID,
        collegeName: req.body.collegeName,
        degree: req.body.degree,
        major: req.body.major,
        collegeLocation: req.body.collegeLocation,
        collegeStartDate: req.body.collegeStartDate,
        collegeDescription: req.body.collegeDescription,
        collegeEndDate: req.body.collegeEndDate
    }
    console.log( req.body )
    studentSchema.findOneAndUpdate( { _id: req.body.params.studentID, "education.educationID": req.body.educationID }
        , { $set: { "education.$": updatedEducation } }, { new: true }
    ).then( doc => {
        console.log( "Education updated", doc )
        callback( null, doc )
        // res.status( 200 ).send( doc );
    } ).catch( error => {
        console.log( "error", error );
        callback( error, null )
        // res.status( 400 ).send( "Error following" );
    } )



}

exports.handle_request = handle_request;