const jobSchema = require( '../../models/jobs' );;

function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }


    let job = new jobSchema( {
        employerID:req.body.employerID,
        employerName:req.body.employerName,
        title:req.body.title,
        industry:req.body.industry,
        country:req.body.country,
        type:req.body.type,
        address:req.body.address,
        city:req.body.city,
        state:req.body.state,
        zip:req.body.zip,
        salary:req.body.salary,
        description:req.body.description,
        qualifications:req.body.qualifications,
        responsibilities:req.body.responsibilities,
        date:Date.now(),
        applicants:[]
    } )

    job.save().then( response => {
        console.log( "create job successfull on MongoDB ",response._id )
        callback( null, response._id )
    } ).catch( error => {
        console.log( "Error", error )
        callback( error, null )
    } )
}



exports.handle_request = handle_request;