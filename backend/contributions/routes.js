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
router.post( '/getReviewsbyEmployer/:employerName', ( req, res ) => {
    // redisClient.get( RedisKey, ( err, data ) => {
    //     if ( data != null ) {
    //         console.log( "from redis" )
    //         res.status( 200 ).send( JSON.parse( data ) )
    //     } else {
    req.body.params = req.params
    kafka.make_request( 'contributions_getReviewByEmployer', req.body, function ( err, results ) {
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

//update review status
router.put( '/reviewStatus/:reviewID', ( req, res ) => {
    req.body.params = req.params
    kafka.make_request( 'contributions_updateReviewStatus', req.body, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 404 ).send( "Failed" )


        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );
} )

//mark review as favourite
router.put( '/favouriteReview/:reviewID', ( req, res ) => {
    req.body.params = req.params
    kafka.make_request( 'contributions_markReviewAsFavourite', req.body, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 404 ).send( "Failed" )


        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );
} )

//mark review as featured
router.put( '/featureReview/:reviewID', ( req, res ) => {
    req.body.params = req.params
    kafka.make_request( 'contributions_markReviewAsFeatured', req.body, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 404 ).send( "Failed" )


        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );
} )


//reply to review
router.put( '/reply/:reviewID', ( req, res ) => {
    req.body.params = req.params
    kafka.make_request( 'contributions_replyToReview', req.body, function ( err, results ) {
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

//get photos by employer
router.post( '/getPhotosByEmployer/:employerName', ( req, res ) => {
    req.body.params = req.params
    kafka.make_request( 'contributions_getPhotosByEmployer', req.body, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 404 ).send( "Failed" )


        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );
} )

//get photos by student
router.get( '/getPhotosByStudent/:studentID', ( req, res ) => {

    kafka.make_request( 'contributions_getPhotosByStudent', req.params, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 404 ).send( "Failed" )


        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );
} )


//add salary
router.post( '/addSalary', ( req, res ) => {

    kafka.make_request( 'contributions_addSalary', req.body, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 404 ).send( "Failed" )


        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );
} )

//get salary by employer
router.post( '/getSalariesByEmployer/:employerName', ( req, res ) => {
    req.body.params = req.params
    kafka.make_request( 'contributions_getSalariesByEmployer', req.body, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 404 ).send( "Failed" )


        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );
} )

//get salary by student
router.get( '/getSalariesByStudent/:studentID', ( req, res ) => {

    kafka.make_request( 'contributions_getSalariesByStudent', req.params, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 404 ).send( "Failed" )


        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );
} )

//add interview
router.post( '/addInterview', ( req, res ) => {

    kafka.make_request( 'contributions_addInterview', req.body, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 404 ).send( "Failed" )


        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );
} )

//get interviews by employer
router.post( '/getInterviewsByEmployer/:employerName', ( req, res ) => {
    req.body.params = req.params
    kafka.make_request( 'contributions_getInterviewsByEmployer', req.body, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 404 ).send( "Failed" )


        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );
} )

//get interviews by student
router.get( '/getInterviewsByStudent/:studentID', ( req, res ) => {

    kafka.make_request( 'contributions_getInterviewsByStudent', req.params, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 404 ).send( "Failed" )


        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );
} )

//update photo status
router.put( '/updatePhotoStatus/:employerID', ( req, res ) => {
    req.body.params = req.params
    kafka.make_request( 'contributions_updatePhotoStatus', req.body, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 404 ).send( "Failed" )


        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );
} )

//update photo status
router.post( '/reviewsPerDay', ( req, res ) => {
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