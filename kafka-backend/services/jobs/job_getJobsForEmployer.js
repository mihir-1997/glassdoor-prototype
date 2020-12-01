const jobSchema = require( '../../models/jobs' );

function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }


    if ( req.body.firstTime ) {
        console.log("@@@@@@@",req.body.pageSize)
        jobSchema.find( { employerID: req.body.params.employerID } ).then( doc => {
            let totalCount=doc.length
       
            jobSchema.find( { employerID: req.body.params.employerID } ).skip( 0 ).limit( req.body.pageSize ).then( doc => {

            // console.log( "User", doc )
          
            callback( null, JSON.stringify( { totalCount: totalCount, jobs: doc } ))
            // res.status( 200 ).send( JSON.stringify( doc ) )
    
    
        } ).catch( error => {
            console.log( "Error fetching jobs ", error )
            callback( error, null )
            // res.status( 400 ).send( "Error fetching user about" )
        } )
    })

    }
    else{
        jobSchema.find( { employerID: req.body.params.employerID } ).skip( ( req.body.pageNumber - 1 ) * req.body.pageSize ).limit( req.body.pageSize ).then( doc => {

            // console.log( "User", doc )
            callback( null,JSON.stringify( { jobs: doc } ))
            // res.status( 200 ).send( JSON.stringify( doc ) )
    
    
        } ).catch( error => {
            console.log( "Error fetching jobs ", error )
            callback( error, null )
            // res.status( 400 ).send( "Error fetching user about" )
        } )
        
    }

    // jobSchema.find( { employerID: req.params.employerID } ).then( doc => {

    //     // console.log( "User", doc )
    //     callback( null, doc )
    //     // res.status( 200 ).send( JSON.stringify( doc ) )


    // } ).catch( error => {
    //     console.log( "Error fetching jobs by employer id ", error )
    //     callback( error, null )
    //     // res.status( 400 ).send( "Error fetching user about" )
    // } )








}



exports.handle_request = handle_request;