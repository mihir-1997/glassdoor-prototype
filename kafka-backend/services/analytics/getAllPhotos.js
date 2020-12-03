const contributionsSchema = require( '../../models/contributions' );


function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }
    contributionsSchema.find( { "type": "photos" } ).then( ph => {

        let photosDoc = JSON.parse( JSON.stringify( ph ) )
        let photos = []
        photosDoc.forEach( doc => {
            photos = photos.concat( doc.photos )

        } );
        callback( null, JSON.stringify( photos ) )

    } ).catch( error => {
        callback( error, null )
    } )





}

exports.handle_request = handle_request;