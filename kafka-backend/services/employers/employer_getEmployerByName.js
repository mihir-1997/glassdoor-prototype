const employerSchema = require( '../../models/employers' );

function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }
    if ( req.body.firstTime ) {
        console.log("@@@@@@@",req.body.pageSize)
        employerSchema.find( { name: new RegExp(req.body.params.name, 'i') } ).then( doc => {
            let totalCount=doc.length
       
        employerSchema.find( { name: new RegExp(req.body.params.name, 'i') } ).skip( 0 ).limit( req.body.pageSize ).then( doc => {

            // console.log( "User", doc )
          
            callback( null, JSON.stringify( { totalCount: totalCount, employers: doc } ))
            // res.status( 200 ).send( JSON.stringify( doc ) )
    
    
        } ).catch( error => {
            console.log( "Error fetching employer by name ", error )
            callback( error, null )
            // res.status( 400 ).send( "Error fetching user about" )
        } )
    })

    }
    else{
        employerSchema.find( { name: new RegExp(req.body.params.name, 'i') } ).skip( ( req.body.pageNumber - 1 ) * req.body.pageSize ).limit( req.body.pageSize ).then( doc => {

            // console.log( "User", doc )
            callback( null,JSON.stringify( { employers: doc } ))
            // res.status( 200 ).send( JSON.stringify( doc ) )
    
    
        } ).catch( error => {
            console.log( "Error fetching employer by name ", error )
            callback( error, null )
            // res.status( 400 ).send( "Error fetching user about" )
        } )
        
    }

    // employerSchema.find( { name: new RegExp(req.body.name, 'i') } ).skip( 0 ).limit( req.body.pageSize ).then( doc => {

    //     // console.log( "User", doc )
    //     callback( null, doc )
    //     // res.status( 200 ).send( JSON.stringify( doc ) )


    // } ).catch( error => {
    //     console.log( "Error fetching employer by name ", error )
    //     callback( error, null )
    //     // res.status( 400 ).send( "Error fetching user about" )
    // } )








}



exports.handle_request = handle_request;