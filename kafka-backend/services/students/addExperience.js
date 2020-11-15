const studentSchema = require( '../../models/students' );


function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }

    let newExperience = {
        experienceID: Date.now(),
        companyName: req.body.companyName,
        jobTitle: req.body.jobTitle,
        jobStartDate: req.body.jobStartDate,
        jobEndDate: req.body.jobEndDate,
        jobLocation: req.body.jobLocation,
        jobDescription: req.body.jobDescription
    }
    studentSchema.findByIdAndUpdate( { _id: req.body.params.studentID }
        , { $push: { experience: newExperience } }, { new: true }
    ).then( doc => {
        console.log( "Experience Added", doc )
        callback( null, doc )
        // res.status( 200 ).send( doc );
    } ).catch( error => {
        console.log( "error", error );
        callback( error, null )
        // res.status( 400 ).send( "Error following" );
    } )



}

exports.handle_request = handle_request;