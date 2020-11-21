const studentSchema = require( '../../models/students' );


function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }

    let newEducation = {
        educationID: Date.now(),
        collegeName: req.body.collegeName,
        degree: req.body.degree,
        major: req.body.major,
        collegeLocation: req.body.collegeLocation,
        collegeStartDate: req.body.collegeStartDate,
        collegeDescription: req.body.collegeDescription,
        collegeEndDate: req.body.collegeEndDate
    }
    studentSchema.findByIdAndUpdate( { _id: req.body.params.studentID }
        , { $push: { education: newEducation } }, { new: true }
    ).then( doc => {
        console.log( "Education Added", doc )
        callback( null, doc )
        // res.status( 200 ).send( doc );
    } ).catch( error => {
        console.log( "error", error );
        callback( error, null )
        // res.status( 400 ).send( "Error following" );
    } )



}

exports.handle_request = handle_request;