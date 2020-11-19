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

//get review
router.get( '/getReviews/:studentID', ( req, res ) => {
    const RedisKey = req.params.studentID;
    redisClient.get( RedisKey, ( err, data ) => {
        if ( data != null ) {
            console.log( "from redis" )
            res.status( 200 ).send( JSON.parse( data ) )
        } else {
            kafka.make_request( 'contributions_getReview', req.params, function ( err, results ) {
                if ( err ) {
                    console.log( "Inside err", err );
                    res.status( 404 ).send( "Failed" )


                } else {
                    console.log( "Inside else", results );
                    res.status( 200 ).send( results )

                }
            } )
            // contributionsSchema.findOne( { "studentID": req.params.studentID } ).then( doc => {
            //     // console.log( RedisKey, doc )
            //     redisClient.setex( RedisKey, 600, JSON.stringify( doc ) )
            //     res.status( 200 ).send( doc );
            // } ).catch( error => {
            //     res.status( 400 ).send( "Error getting" + error );
            // } )
        }
    } )



} )

//add review
router.post( '/addReview', ( req, res ) => {
    // let newReview = {
    //     type: "review",
    //     studentID: req.body.studentID,
    //     employerID: req.body.employerID,
    //     ratingOverall: req.body.ratingOverall,
    //     ratingRTF: req.body.ratingRTF,
    //     ratingCEO: req.body.ratingCEO,
    //     headline: req.body.headline,
    //     pros: req.body.pros,
    //     cons: req.body.cons,
    //     description: req.body.description,
    //     helpful: req.body.helpful
    // }
    // console.log( "in" )
    // let reviews = []
    // for ( let i = 0; i < 10000; i++ ) {
    //     let newReview = {
    //         type: "review",
    //         studentID: faker.random.uuid(),
    //         employerID: faker.random.uuid(),
    //         ratingOverall: faker.random.number(),
    //         ratingRTF: faker.random.number(),
    //         ratingCEO: faker.random.number(),
    //         headline: faker.lorem.sentence(),
    //         pros: faker.lorem.words(),
    //         cons: faker.lorem.words(),
    //         description: faker.lorem.sentences(),
    //         helpful: faker.random.number()
    //     }
    //     reviews.push( newReview )
    // }
    // contributionsSchema.insertMany( reviews )
    //     .then( doc => {
    //         console.log( "Review Added" )
    //         // callback( null, doc )
    //         res.status( 200 ).send( doc );
    //     } ).catch( error => {
    //         console.log( "error", error );
    //         // callback( error, null )
    //         res.status( 400 ).send( "Error following" );
    //     } )
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

module.exports = router;