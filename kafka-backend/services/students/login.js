var bcrypt = require( 'bcrypt' );
const studentSchema = require( '../../models/students' );
var connection = require( '../../config/db_config' ).connection;
var jwt = require( 'jsonwebtoken' );
var { secret } = require( '../../config/config' );

function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }


    var sql = `select mongoID,name,email,password from students where email="${ req.body.email }"`;

    connection.query( sql, ( err, results ) => {
        if ( err ) {
            console.log( "error:", err );
        } else {
            if ( results.length > 0 ) {
                bcrypt.compare( req.body.password, results[ 0 ].password ).then( res => {
                    console.log( "res", res )

                    if ( res ) {
                        let payload = {
                            id: results[ 0 ].mongoID,
                            email: results[ 0 ].email,
                            name: results[ 0 ].name,
                            type: "students"
                        }

                        let token = jwt.sign( payload, secret, {
                            expiresIn: 1008000
                        } )
                        console.log( "Login Successfull", token )
                        callback( null, "Bearer " + token )
                        // res.status( 200 ).send( "Bearer " + token )
                    } else {
                        console.log( "Invalid Credentials" )
                        // res.status( 401 ).send( "Invalid Credentials" )
                        callback( "401", null )
                    }
                } )


            } else {
                callback( "404", null )
            }

        }
    } );




}

exports.handle_request = handle_request;