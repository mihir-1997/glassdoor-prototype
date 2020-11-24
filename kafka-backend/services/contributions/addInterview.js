const contributionsSchema = require( '../../models/contributions' );


function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }

    let newInterview = new contributionsSchema( {
        type: "interview",
        studentID: req.body.studentID,
        employerName: req.body.employerName,
        overallExperience: req.body.overallExperience,
        jobTitle: req.body.jobTitle,
        description: req.body.description,
        difficulty: req.body.difficulty,
        offerStatus: req.body.offerStatus,
        questionAnswers: req.body.questionAnswers,
        interviewDate: Date.now()
    } )

    newInterview.save().then( doc => {
        console.log( "Interview Added", doc )
        callback( null, doc )
        // res.status( 200 ).send( doc );
    } ).catch( error => {
        console.log( "error", error );
        callback( error, null )
        // res.status( 400 ).send( "Error following" );
    } )



}

exports.handle_request = handle_request;