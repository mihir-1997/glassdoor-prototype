const studentSchema = require( '../../models/students' );


function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }

    let updatedExperience = {
        experienceID: req.body.experienceID,
        companyName: req.body.companyName,
        jobTitle: req.body.jobTitle,
        jobStartDate: req.body.jobStartDate,
        jobEndDate: req.body.jobEndDate,
        jobLocation: req.body.jobLocation,
        jobDescription: req.body.jobDescription
    }
    console.log( req.body )
    studentSchema.findOneAndUpdate( { _id: req.body.params.studentID, "experience.experienceID": req.body.experienceID }
        , { $set: { "experience.$": updatedExperience } }, { new: true }
    ).then( doc => {
        console.log( "Experience updated", doc )
        callback( null, doc )
        // res.status( 200 ).send( doc );
    } ).catch( error => {
        console.log( "error", error );
        callback( error, null )
        // res.status( 400 ).send( "Error following" );
    } )



}

exports.handle_request = handle_request;