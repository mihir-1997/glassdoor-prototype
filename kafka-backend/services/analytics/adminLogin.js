var bcrypt = require( 'bcrypt' );
const studentSchema = require( '../../models/students' );
var connection = require( '../../config/db_config' ).connection;
var jwt = require( 'jsonwebtoken' );
var { secret } = require( '../../config/config' );

function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }


    var sql = `select userName,password from admin where userName="${ req.body.userName }"`;

    connection.query( sql, ( err, results ) => {
        if ( err ) {
            console.log( "error:", err );
        } else {
            if ( results.length > 0 ) {
                console.log( req.body )
                console.log( results[ 0 ] )
                if ( req.body.userName === results[ 0 ].userName && req.body.password === results[ 0 ].password ) {
                    let payload = {
                        id: results[ 0 ].adminID,
                        userName: results[ 0 ].userName,
                        type: "admin"
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



            } else {
                callback( "404", null )
            }

        }
    } );




}

exports.handle_request = handle_request;