const jobSchema = require( '../../models/jobs' );

function handle_request ( msg, callback ) {
    let req = {
        params: msg
    }

    let stats =[{}];
    jobSchema.find( { employerID: req.params.employerID } ).then( doc => {
        doc.forEach( jobs => {
            console.log("######",jobs.employerName);
            let total=0;
            let hired=0;
            let rejected=0;
            jobs.applicants.forEach(application =>{
                total++;
                if(application.status==="Hired")
                {
                    hired++;
                }

            })
            rejected=total-hired;
            stats.push({"jobID":jobs._id,"total":total,"hired":hired,"rejected":rejected})

        })

        // console.log( "User", doc )
        callback( null, stats )
        // res.status( 200 ).send( JSON.stringify( doc ) )


    } ).catch( error => {
        console.log( "Error fetching jobs by employer id ", error )
        callback( error, null )
        // res.status( 400 ).send( "Error fetching user about" )
    } )








}



exports.handle_request = handle_request;