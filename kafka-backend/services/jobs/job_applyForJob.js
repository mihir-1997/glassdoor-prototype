const jobSchema = require( '../../models/jobs' );


function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }

    var application = {
        studentID: req.body.studentID,
        resumeID:req.body.resumeID,
        resumeName:req.body.resumeName,
        name:req.body.name,
        status: "Submitted",
        imageName:req.body.imageName,
        ethnicity: req.body.ethnicity,
        gender: req.body.gender,
        disability: req.body.disability,
        veteranStatus: req.body.veteranStatus,
        application_date:Date.now()

    }

    jobSchema.findOneAndUpdate( { _id: req.body.params.jobID }
        , { $push:{ "applicants": application } } , { useFindAndModify: false }, function (error, success) {
            if (error) {
                console.log( "error", error );
                callback( error, null )
            } else {
                console.log("success:",success)
                callback( null, success )
            }
        })


}

exports.handle_request = handle_request;