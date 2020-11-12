var passport = require( "passport" );
var JwtStrategy = require( 'passport-jwt' ).Strategy;
var ExtractJwt = require( 'passport-jwt' ).ExtractJwt;
var users = require( '../models/users' );
var restaurants = require( '../models/restaurants' );
var { secret } = require( '../config/config' )

// Setup work and export for the JWT passport strategy
function auth () {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = secret;
    passport.use( new JwtStrategy( opts, function ( jwt_payload, callback ) {
        // console.log( "JWT payload received", jwt_payload );

        if ( jwt_payload.type == "students" ) {
            users.findOne( { email: jwt_payload.email }, function ( err, user ) {
                if ( err ) {
                    console.log( "Error in passport" + err )
                    return callback( err, false );
                }
                if ( user ) {
                    callback( null, user );
                } else {
                    callback( null, false );
                }
            } ).catch( error => {
                console.log( "Error in auth users", error )
            } );
        } else if ( jwt_payload.type == "employers" ) {
            restaurants.findOne( { email: jwt_payload.email }, function ( err, restaurant ) {
                if ( err ) {
                    console.log( "Error in passport" + err )
                    return callback( err, false );
                }
                if ( restaurant ) {
                    callback( null, restaurant );
                } else {
                    callback( null, false );
                }
            } ).catch( error => {
                console.log( "Error in auth restaurants", error )
            } );
        }
    } ) );
};


exports.auth = auth;
exports.checkAuth = passport.authenticate( 'jwt', { session: false } )