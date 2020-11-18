var express = require( 'express' );
var bcrypt = require( 'bcrypt' );
var router = express.Router();
var mongoose = require( '../config/db_config' );
var jwt = require( 'jsonwebtoken' );
var { secret } = require( '../config/config' )
var { auth, checkAuth } = require( '../config/passport' )
var kafka = require( '../kafka/client' );
auth();

//sample get
router.get( '/', ( req, res ) => {

} )
//employer signup
router.post( '/registerEmployer', ( req, res ) => {
    console.log("register Employer");
    kafka.make_request( 'employer_signup', req.body, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 400 ).send( err )
        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );
} )

//employer login
router.post( '/loginEmployer', ( req, res ) => {
    kafka.make_request( 'employer_login', req.body, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            if ( err === "401" ) {
                res.status( 401 ).send( "Wrong Credentials" )
            } else {
                res.status( 404 ).send( "No employer found" )
            }

        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );
} )

//sample post
router.post( '/', ( req, res ) => {

} )

//sample put
router.put( '/', ( req, res ) => {

} )

//sample delete
router.delete( '/', ( req, res ) => {

} )

module.exports = router;