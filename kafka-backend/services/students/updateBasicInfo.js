const studentSchema = require( '../../models/students' );

function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }
    studentSchema.findOneAndUpdate( { _id: req.body.params.studentID },
        {
            $set: {
                name: req.body.name,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address,
                city: req.body.city,
                zipcode: req.body.zipcode,
                website: req.body.website,

            }
        }, { new: true }
    ).then( response => {
        console.log( "Update successfull" )
        callback( null, response )
    } ).catch( error => {
        console.log( "Error in update", error )
        callback( error, null )
    } )








}



exports.handle_request = handle_request;