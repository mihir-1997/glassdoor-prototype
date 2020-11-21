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

//get review by students
router.get( '/getReviewsbyStudent/:studentID', ( req, res ) => {
    const RedisKey = req.params.studentID;
    // redisClient.get( RedisKey, ( err, data ) => {
    //     if ( data != null ) {
    //         console.log( "from redis" )
    //         res.status( 200 ).send( JSON.parse( data ) )
    //     } else {
    kafka.make_request( 'contributions_getReview', req.params, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 404 ).send( "Failed" )


        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }
    } )

} )

//get review by Employers
router.get( '/getReviewsbyEmployer/:employerName', ( req, res ) => {
    // redisClient.get( RedisKey, ( err, data ) => {
    //     if ( data != null ) {
    //         console.log( "from redis" )
    //         res.status( 200 ).send( JSON.parse( data ) )
    //     } else {
    kafka.make_request( 'contributions_getReviewByEmployer', req.params, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 404 ).send( "Failed" )


        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }
    } )

} )

//add review
router.post( '/addReview', ( req, res ) => {

    kafka.make_request( 'contributions_addReview', req.body, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 404 ).send( "Failed" )


        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );
} )

//remove review
router.delete( '/removeReview/:reviewID', checkAuth, ( req, res ) => {

    kafka.make_request( 'contributions_removeReview', req.params, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 404 ).send( "Failed" )


        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );
} )

//add helpful vote
router.put( '/helpfulReview/:reviewID', ( req, res ) => {

    kafka.make_request( 'contributions_helpfulReview', req.params, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 404 ).send( "Failed" )


        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );
} )

//upload office photos
router.post( '/uploadPhotos/:employerID', checkAuth, ( req, res ) => {
    let upload = req.app.get( 'upload_officePhotos' );
    upload( req, res, err => {
        if ( err ) {
            console.log( "Error uploading officePhotos", err );
            res.status( 400 ).end( 'Issue with uploading' )
        } else {
            console.log( "Inside upload", req.file, req.body );
            req.body.file = req.files
            req.body.params = req.params
            kafka.make_request( 'contributions_addPhotos', req.body, function ( err, results ) {
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

module.exports = router;