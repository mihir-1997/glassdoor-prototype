const contributionsSchema = require( '../../models/contributions' );



function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }


    console.log( "req", req.body )
    var newphotos = []
    for ( let i = 0; i < req.body.file.length; i++ ) {
        newphotos.push( { photoID: Date.now() + i, photo: req.body.file[ i ].filename, photoStatus: "Pending", photoDate: Date.now() } )
    }

    let newPhotos = new contributionsSchema( {
        type: "photos",
        photos: newphotos,
        studentID: req.body.studentID,
        employerID: req.body.params.employerID,
        employerName: req.body.employerName,
    } )
    newPhotos.save().then( response => {
        // console.log( "inside update", response )
        callback( null, response )
    } ).catch( error => {
        console.log( "in catch", error )
        callback( error, null )

    } )
}





exports.handle_request = handle_request;