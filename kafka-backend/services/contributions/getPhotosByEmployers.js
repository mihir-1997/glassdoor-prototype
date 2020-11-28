const contributionsSchema = require( '../../models/contributions' );


function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }
    if ( req.body.firstTime ) {
        contributionsSchema.count( { $and: [ { "employerName": req.body.params.employerName }, { "type": "photos" } ] } ).then( ph => {
            console.log( ph )
            contributionsSchema.find( { $and: [ { "employerName": req.body.params.employerName }, { "type": "photos" } ] } ).skip( 0 ).limit( req.body.pageSize ).then( doc => {

                callback( null, JSON.stringify( { totalcount: ph, photos: doc } ) )
            } ).catch( error => {
                callback( error, null )
            } )

        } ).catch( error => {
            callback( error, null )
        } )
    } else {
        contributionsSchema.find( { $and: [ { "employerName": req.body.params.employerName }, { "type": "photos" } ] } ).skip( ( req.body.pageNumber - 1 ) * req.body.pageSize ).limit( req.body.pageSize ).then( doc => {

            callback( null, JSON.stringify( { totalcount: {}, photos: doc } ) )
        } ).catch( error => {
            callback( error, null )
        } )
    }




}

exports.handle_request = handle_request;