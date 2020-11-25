const jobSchema = require( '../../models/jobs' );


function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }


    jobSchema.findOneAndUpdate( { "applicants._id": req.body.params.applicationID }
        , { $set:{ "applicants.$.status": req.body.status } } , { useFindAndModify: false }, function (error, success) {
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