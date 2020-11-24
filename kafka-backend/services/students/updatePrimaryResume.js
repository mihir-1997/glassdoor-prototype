const studentsSchema = require( '../../models/students' );



function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }



    studentsSchema.findById( { _id: req.body.params.studentID }
    ).then( doc => {
        doc.resume.forEach( resume => {
            if ( resume.isPrimary == true ) {
                resume.isPrimary = false
            }
            if ( resume.resumeID === req.body.resumeID ) {
                resume.isPrimary = true
            }

        } )
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