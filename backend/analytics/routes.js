var express = require( 'express' );
var bcrypt = require( 'bcrypt' );
var router = express.Router();
var mongoose = require( '../config/db_config' );
var jwt = require( 'jsonwebtoken' );
var { secret } = require( '../config/config' )
var kafka = require( '../kafka/client' );
var contributionsSchema = require( '../models/contributions' )
var faker = require( 'faker' )
var redis = require( 'redis' )
var { auth, checkAuth } = require( '../config/passport' )
auth();
// var redis = require( 'redis' );
// var redisClient = redis.createClient();

// redisClient.on( 'connect', function () {
//     console.log( 'Redis client connected' );
// } );

// redisClient.on( 'error', function ( err ) {
//     console.log( 'Something went wrong while connecting redis' + err );
// } );


//students login
router.post( '/loginAdmin', ( req, res ) => {
    kafka.make_request( 'admin_login', req.body, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            if ( err === "401" ) {
                res.status( 401 ).send( "Wrong Credentials" )
            } else {
                res.status( 404 ).send( "No user found" )
            }

        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );
} )

//reviews stats
router.get( '/reviewsPerDay', checkAuth, ( req, res ) => {
    kafka.make_request( 'analytics_reviewsperday', req.body, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 404 ).send( "Failed" )


        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );
} )

module.exports = router;