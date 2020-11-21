const contributionsSchema = require( '../../models/contributions' );


function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }

    let newReview = new contributionsSchema( {
        type: "review",
        studentID: req.body.studentID,
        employerName: req.body.employerName,
        employeeStatus: req.body.employeeStatus,
        rating: req.body.rating,
        isPositive: req.body.isPositive,
        recommended: req.body.recommended,
        approveCEO: req.body.approveCEO,
        headline: req.body.headline,
        pros: req.body.pros,
        cons: req.body.cons,
        description: req.body.description,
        helpful: req.body.helpful
    } )

    newReview.save().then( doc => {
        console.log( "Review Added", doc )
        callback( null, doc )
        // res.status( 200 ).send( doc );
    } ).catch( error => {
        console.log( "error", error );
        callback( error, null )
        // res.status( 400 ).send( "Error following" );
    } )



}

exports.handle_request = handle_request;