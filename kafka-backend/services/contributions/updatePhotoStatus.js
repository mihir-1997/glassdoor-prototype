const contributionsSchema = require( '../../models/contributions' );

function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }
    contributionsSchema.findOne( { $and: [ { "type": "photos" }, { "employerID": req.body.params.employerID } ] }
    ).then( resp => {
        var response = JSON.parse( JSON.stringify( resp ) )
        response.photos.forEach( photo => {
            if ( req.body.photoIDs.includes( photo.photoID ) ) {
                photo.photoStatus = "Rejected"

            }
        } );
        contributionsSchema.findOneAndUpdate( { $and: [ { "type": "photos" }, { "employerID": req.body.params.employerID } ] },
            { $set: { photos: response.photos } }, { new: true }
        ).then( doc => {
            console.log( "Photo Status Update successfull" )
            callback( null, doc )
        } ).catch( error => {
            console.log( "Error in update", error )
            callback( error, null )
        } )
        console.log( "Photo Status Update successfull" )
        callback( null, response )
    } ).catch( error => {
        console.log( "Error in update", error )
        callback( error, null )
    } )








}



exports.handle_request = handle_request;