const jobSchema = require( '../../models/jobs' );

function handle_request ( msg, callback ) {
    let req = {
        params: msg
    }

    jobSchema.find( { "applicants.studentID": req.params.studentID }  ,  { 'applicants.$': 1,'employerName':1, 'employerID':1,'title':1,'industry':1,'country':1,'type':1,'address':1,'city':1,'state':1,'zip':1,'salary':1,'qualifications':1,'responsibilities':1,'description':1,'date':1 }).then( doc => {

        // console.log( "User", doc )
        callback( null, doc )
        // res.status( 200 ).send( JSON.stringify( doc ) )


    } ).catch( error => {
        console.log( "Error fetching jobs by employer id ", error )
        callback( error, null )
        // res.status( 400 ).send( "Error fetching user about" )
    } )








}



exports.handle_request = handle_request;