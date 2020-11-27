var passport = require( "passport" );
var JwtStrategy = require( 'passport-jwt' ).Strategy;
var ExtractJwt = require( 'passport-jwt' ).ExtractJwt;
var students = require( '../models/students' );
var employers = require( '../models/employers' );
var { secret } = require( '../config/config' )
var connection = require( '../config/db_config' ).connection

// Setup work and export for the JWT passport strategy
function auth () {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = secret;
    passport.use( new JwtStrategy( opts, function ( jwt_payload, callback ) {


        if ( jwt_payload.type == "students" ) {
            var sql = `select * from students where email="${ jwt_payload.email }"`;
            connection.query( sql, ( err, results ) => {
                if ( err ) {
                    console.log( "Error in passport" + err )
                    return callback( err, false );
                } else {
                    if ( results.length > 0 ) {
                        callback( null, results );
                    } else {
                        callback( null, false );
                    }
                }

            } );

        } else if ( jwt_payload.type == "employers" ) {
            var sql = `select * from employers where email="${ jwt_payload.email }"`;
            connection.query( sql, ( err, results ) => {
                if ( err ) {
                    console.log( "Error in passport" + err )
                    return callback( err, false );
                } else {
                    if ( results ) {
                        callback( null, results );
                    } else {
                        callback( null, false );
                    }
                }

            } );
        } else if ( jwt_payload.type == "admin" ) {
            var sql = `select * from admin where userName="${ jwt_payload.userName }"`;
            connection.query( sql, ( err, results ) => {
                if ( err ) {
                    console.log( "Error in passport" + err )
                    return callback( err, false );
                } else {
                    if ( results ) {
                        callback( null, results );
                    } else {
                        callback( null, false );
                    }
                }

            } );
        }
    } ) );
};



exports.auth = auth;
exports.checkAuth = passport.authenticate( 'jwt', { session: false } )