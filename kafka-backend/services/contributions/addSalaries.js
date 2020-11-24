const contributionsSchema = require( '../../models/contributions' );


function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }

    let newSalary = new contributionsSchema( {
        type: "salary",
        studentID: req.body.studentID,
        employerName: req.body.employerName,
        baseSalary: req.body.baseSalary,
        bonuses: req.body.bonuses,
        jobTitle: req.body.jobTitle,
        yearsOfExperience: req.body.yearsOfExperience,
        location: req.body.location,
        salaryDate: Date.now(),
        employeeStatus: req.body.employeeStatus

    } )

    newSalary.save().then( doc => {
        console.log( "Salary Added", doc )
        callback( null, doc )
        // res.status( 200 ).send( doc );
    } ).catch( error => {
        console.log( "error", error );
        callback( error, null )
        // res.status( 400 ).send( "Error following" );
    } )



}

exports.handle_request = handle_request;