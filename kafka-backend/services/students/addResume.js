const studentsSchema = require( '../../models/students' );



function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }

    let newResume = {
        resumeID: Date.now(),
        isPrimary: req.body.isPrimary,
        resumeName: req.body.file.originalname,
        imageName: req.body.file.filename,
        date: Date.now()
    }

    studentsSchema.findById( { _id: req.body.params.studentID }
    ).then( doc => {
        if ( doc.resume === undefined || doc.resume.length === 0 ) {
            newResume.isPrimary = "true"
        } else {

            if ( req.body.isPrimary === "true" ) {
                doc.resume.forEach( resume => {
                    if ( resume.isPrimary === true ) {
                        resume.isPrimary = false
                    }
                } );
            }

        }
        doc.resume.push( newResume )

        studentsSchema.findByIdAndUpdate( { _id: req.body.params.studentID },
            { $set: { resume: doc.resume } }, { new: true }
        ).then( response => {
            // console.log( "inside update", response )
            callback( null, response )
        } ).catch( error => {
            console.log( "in catch", error )
            callback( error, null )

        } )

    } ).catch( error => {
        console.log( "in error", error )
        callback( error, null )
    } )


}

exports.handle_request = handle_request;