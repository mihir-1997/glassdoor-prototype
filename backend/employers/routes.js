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

//upload profile pic employer
router.post( '/updateEmployerProfilePicture/:employerID', checkAuth,  ( req, res ) => {
    let upload = req.app.get( 'upload_profileImage' );
    upload( req, res, err => {
        if ( err ) {
            console.log( "Error uploading image", err );
            res.status( 400 ).end( 'Issue with uploading' )
        } else {
            console.log( "Inside upload", req.file, req.body );
            req.body.file = req.file
            req.body.params = req.params
            kafka.make_request( 'employer_updateEmployerProfilePicture', req.body, function ( err, results ) {
                if ( err ) {
                    console.log( "Inside err" );
                    res.status( 400 ).send( "Error Fetching users", err )
                } else {
                    // console.log( "Inside else", results );
                    res.status( 200 ).send( JSON.stringify( results ) )

                }

            } );


        }
    } );
} );

//upload logo image of  employer
router.post( '/updateEmployerLogo/:employerID',   checkAuth, ( req, res ) => {
    let upload = req.app.get( 'upload_profileImage' );
    upload( req, res, err => {
        if ( err ) {
            console.log( "Error uploading logo image", err );
            res.status( 400 ).end( 'Issue with uploading' )
        } else {
            console.log( "Inside upload", req.file, req.body );
            req.body.file = req.file
            req.body.params = req.params
            kafka.make_request( 'employer_updateEmployerLogo', req.body, function ( err, results ) {
                if ( err ) {
                    console.log( "Inside err" );
                    res.status( 400 ).send( "Error uploading logo", err )
                } else {
                    // console.log( "Inside else", results );
                    res.status( 200 ).send( JSON.stringify( results ) )

                }

            } );


        }
    } );
} );

//get employer by name
router.get( '/getEmployerByName/:name',  checkAuth,  ( req, res ) => {
    console.log("inside getEmployerByName")
    req.body.params = req.params
    kafka.make_request( 'employer_getEmployerByName', req.body, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 404 ).send( "No employer found" )


        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );
} )

//get all employers
router.get( '/getAllEmployers', checkAuth, ( req, res ) => {
    console.log("inside getAllEmployers")
    kafka.make_request( 'employer_getAllEmployers', req.params, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 404 ).send( "No employer found" )


        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );
} )


//get employer by id
router.get( '/getEmployerById/:employerId', checkAuth, ( req, res ) => {
    console.log("inside getEmployerById")
    kafka.make_request( 'employer_getEmployerById', req.params, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 404 ).send( "No employer found by this Id" )


        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );
} )

//update student basic info
router.put( '/updateEmployerBasicInfo/:employerId', checkAuth, ( req, res ) => {
    req.body.params = req.params
    kafka.make_request( 'employer_updateEmployerBasicInfo', req.body, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 404 ).send( "No employer found" )


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