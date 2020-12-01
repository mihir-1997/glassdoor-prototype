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

//Create Jobs
router.post( '/createJob',  checkAuth,( req, res ) => {
    console.log("register Employer");
    kafka.make_request( 'job_createJob', req.body, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 400 ).send( err )
        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );
} )


//get jobs for a employer
router.get( '/getJobsForEmployer/:employerID',  checkAuth, ( req, res ) => {
    console.log("inside getJobsForEmployer")
    req.body.params = req.params
    kafka.make_request( 'job_getJobsForEmployer', req.body, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 404 ).send( "No jobs found" )


        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );
} )

//get all jobs 
router.get( '/getAllJobs', checkAuth,( req, res ) => {
    console.log("inside getAllJobs")
    kafka.make_request( 'job_getAllJobs', req.params, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 404 ).send( "No jobs found" )


        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );
} )

//get jobs based on job title
router.get( '/getJobsBasedOnTitle/:title', checkAuth, ( req, res ) => {
    console.log("inside getJobsBasedOnTitle")
    kafka.make_request( 'job_getJobsBasedOnTitle', req.params, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 404 ).send( "No jobs found" )


        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );
} )

//apply for a job
router.put( '/applyForJob/:jobID',  checkAuth,( req, res ) => {
    console.log("Apply for Job");
    req.body.params = req.params
    kafka.make_request( 'job_applyForJob', req.body, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 400 ).send( err )
        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );
} )

//get all applications status for students
router.get( '/getApplicationStatus/:studentID',checkAuth, ( req, res ) => {
    console.log("inside getApplicationStatus")
    kafka.make_request( 'job_getApplicationStatus', req.params, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 404 ).send( "No applications found" )


        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );
} )

//withdraw an application
router.put( '/withdrawApplication/:applicationID',checkAuth, ( req, res ) => {
    console.log("withdraw application");
    req.body.params = req.params
    kafka.make_request( 'job_withdrawApplication', req.body, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 400 ).send( err )
        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );
} )

//get list of applicants for an employer
router.get( '/getListofApplicants/:jobID', checkAuth,( req, res ) => {
    console.log("inside getApplicationStatus")
    kafka.make_request( 'job_getListofApplicants', req.params, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 404 ).send( "No applications found" )


        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );
} )

//change status of an application
router.put( '/applicationStatusChange/:applicationID',checkAuth, ( req, res ) => {
    console.log("applicationStatusChange");
    req.body.params = req.params
    kafka.make_request( 'job_applicationStatusChange', req.body, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 400 ).send( err )
        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );
} )

//get report of jobs for a employer
router.get( '/getJobsReport/:employerID',  checkAuth,( req, res ) => {
    console.log("inside getJobsReport")
    kafka.make_request( 'job_getJobsReport', req.params, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 404 ).send( "No stats found" )


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