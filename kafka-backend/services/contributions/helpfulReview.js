const contributionsSchema = require( '../../models/contributions' );


function handle_request ( msg, callback ) {
    let req = {
        params: msg
    }


    contributionsSchema.findOneAndUpdate( { _id: req.params.reviewID },
        { $inc: { helpful: 1 } }, { new: true }
    ).then( doc => {
        console.log( "Review updated", doc )
        callback( null, doc )
        // res.status( 200 ).send( doc );
    } ).catch( error => {
        console.log( "error", error );
        callback( error, null )
        // res.status( 400 ).send( "Error following" );
    } )



}

exports.handle_request = handle_request;