const contributionsSchema = require( '../../models/contributions' );

function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }
    contributionsSchema.findOneAndUpdate( { _id: req.body.params.reviewID },
        {
            $set: {
                featured: req.body.featured,
            }
        }, { new: true }
    ).then( response => {
        console.log( "Review mark as featured successfull" )
        callback( null, response )
    } ).catch( error => {
        console.log( "Error in update", error )
        callback( error, null )
    } )








}



exports.handle_request = handle_request;