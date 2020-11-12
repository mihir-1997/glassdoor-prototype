var express = require( 'express' );
var bcrypt = require( 'bcrypt' );
var router = express.Router();
var mongoose = require( '../config/db_config' );
var jwt = require( 'jsonwebtoken' );
var { secret } = require( '../config/config' )
var { auth, checkAuth } = require( '../config/passport' )
var kafka = require( '../kafka/client' );
auth();

//students signup
router.post( '/registerUser', ( req, res ) => {
    kafka.make_request( 'students_signup', req.body, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 400 ).send( err )
        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );
} )


//students login
router.post( '/loginUser', ( req, res ) => {
    kafka.make_request( 'students_login', req.body, function ( err, results ) {
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


router.get( '/getUser/:studentID', checkAuth, ( req, res ) => {
    kafka.make_request( 'students_getStudent', req.params, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 404 ).send( "No student found" )


        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );
} )


module.exports = router;