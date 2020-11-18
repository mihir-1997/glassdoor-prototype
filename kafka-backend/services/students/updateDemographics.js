const studentSchema = require( '../../models/students' );


function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }

    let updatedDemographics = {
        ethnicity: req.body.ethnicity,
        gender: req.body.gender,
        disability: req.body.disability,
        veteranStatus: req.body.veteranStatus,

    }
    studentSchema.findOneAndUpdate( { _id: req.body.params.studentID }
        , { $set: { "userDemographics": updatedDemographics } }, { new: true }
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