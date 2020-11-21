const contributionsSchema = require( '../../models/contributions' );



function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }


    console.log( "req", req.body )
    var newphotos = []
    for ( let i = 0; i < req.body.file.length; i++ ) {
        newphotos.push( req.body.file[ i ].filename )
    }
    contributionsSchema.findOne( { $and: [ { "employerID": req.body.params.employerID }, { "type": "photos" } ] }
    ).then( doc => {
        if ( doc ) {

            contributionsSchema.findOneAndUpdate( { $and: [ { "employerID": req.body.params.employerID }, { "type": "photos" } ] },
                { $push: { photos: { $each: newphotos } } }, { new: true }
            ).then( response => {
                // console.log( "inside update", response )
                callback( null, response )
            } ).catch( error => {
                console.log( "in catch", error )
                callback( error, null )

            } )
        } else {

            let newPhotos = new contributionsSchema( {
                type: "photos",
                photos: newphotos,
                employerID: req.body.params.employerID,
            } )
            newPhotos.save().then( response => {
                // console.log( "inside update", response )
                callback( null, response )
            } ).catch( error => {
                console.log( "in catch", error )
                callback( error, null )

            } )
        }


    } ).catch( error => {
        console.log( "in error", error )
        callback( error, null )
    } )


}

exports.handle_request = handle_request;