const contributionsSchema = require( '../../models/contributions' );

function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }
    contributionsSchema.findById( { _id: req.body.params.objectID }
    ).then( resp => {
        var response = JSON.parse( JSON.stringify( resp ) )
        response.photos.forEach( photo => {
            if ( photo.photoID === req.body.photoID ) {
                photo.photoStatus = req.body.status

            }
        } );
        contributionsSchema.findByIdAndUpdate( { _id: req.body.params.objectID },
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