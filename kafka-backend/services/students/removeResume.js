const studentsSchema = require( '../../models/students' );



function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }



    studentsSchema.findById( { _id: req.body.params.studentID }
    ).then( doc => {
        var flag = false
        let filtered = doc.resume.filter( resume => {
            if ( resume.resumeID === req.body.resumeID && resume.isPrimary === true ) {
                flag = true
                return false
            } else if ( resume.resumeID === req.body.resumeID ) {
                return false
            } else {
                return true
            }
        } )
        if ( flag && filtered.length !== 0 ) {
            filtered[ filtered.length - 1 ].isPrimary = "true"

        }

        studentsSchema.findByIdAndUpdate( { _id: req.body.params.studentID },
            { $set: { resume: filtered } }, { new: true }
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