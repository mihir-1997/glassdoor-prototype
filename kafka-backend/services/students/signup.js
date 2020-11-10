// const userSchema = require( '../../models/users' );


function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }

    callback( null, "test success" )



}

exports.handle_request = handle_request;