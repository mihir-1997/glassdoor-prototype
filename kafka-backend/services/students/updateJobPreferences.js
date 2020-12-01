const studentSchema = require( '../../models/students' );


function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }

    var updatedJobPreference = {
        searchStatus: req.body.searchStatus,
        jobTitle: req.body.jobTitle,
        targetSalary: req.body.targetSalary,
        openToRelocation: req.body.openToRelocation,
        typeOfIndustry: req.body.typeOfIndustry,

    }

    studentSchema.findOneAndUpdate( { _id: req.body.params.studentID }
        , { $set: { "jobPreference": updatedJobPreference } }, { new: true }
    ).then( doc => {
        callback( null, doc )
        // res.status( 200 ).send( doc );
    } ).catch( error => {
        console.log( "error", error );
        callback( error, null )
        // res.status( 400 ).send( "Error following" );
    } )



}

exports.handle_request = handle_request;