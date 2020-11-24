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

//get student by id
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
//update student basic info
router.put( '/updateUserBasicInfo/:studentID', checkAuth, ( req, res ) => {
    req.body.params = req.params
    kafka.make_request( 'students_updateBasicInfo', req.body, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 404 ).send( "No student found" )


        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );
} )


//update student about me
router.put( '/updateUserAbout/:studentID', checkAuth, ( req, res ) => {
    req.body.params = req.params
    kafka.make_request( 'students_updateAboutMe', req.body, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 404 ).send( "No student found" )


        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );
} )

//add student experience
router.post( '/addUserExperience/:studentID', checkAuth, ( req, res ) => {
    req.body.params = req.params
    kafka.make_request( 'students_addExperience', req.body, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 404 ).send( "No student found" )


        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );
} )


//update student experience
router.put( '/updateUserExperience/:studentID', checkAuth, ( req, res ) => {
    req.body.params = req.params
    kafka.make_request( 'students_updateExperience', req.body, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 404 ).send( "No student found" )


        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );
} )

//remove student experience
router.delete( '/removeUserExperience/:studentID', checkAuth, ( req, res ) => {
    req.body.params = req.params
    kafka.make_request( 'students_removeExperience', req.body, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 404 ).send( "No student found" )


        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );
} )


//update student skills
router.put( '/updateUserSkills/:studentID', checkAuth, ( req, res ) => {
    req.body.params = req.params
    kafka.make_request( 'students_updateSkills', req.body, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 404 ).send( "No student found" )


        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );
} )

//add student education
router.post( '/addUserEducation/:studentID', checkAuth, ( req, res ) => {
    req.body.params = req.params
    kafka.make_request( 'students_addEducation', req.body, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 404 ).send( "No student found" )


        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );
} )


//update student education
router.put( '/updateUserEducation/:studentID', checkAuth, ( req, res ) => {
    req.body.params = req.params
    kafka.make_request( 'students_updateEducation', req.body, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 404 ).send( "No student found" )


        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );
} )

//remove student education
router.delete( '/removeUserEducation/:studentID', checkAuth, ( req, res ) => {
    req.body.params = req.params
    kafka.make_request( 'students_removeEducation', req.body, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 404 ).send( "No student found" )


        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );
} )

//upload profile pic
router.post( '/updateUserProfilePicture/:studentID', checkAuth, ( req, res ) => {
    let upload = req.app.get( 'upload_profileImage' );
    upload( req, res, err => {
        if ( err ) {
            console.log( "Error uploading image", err );
            res.status( 400 ).end( 'Issue with uploading' )
        } else {
            console.log( "Inside upload", req.file, req.body );
            req.body.file = req.file
            req.body.params = req.params
            kafka.make_request( 'upload_ProfilePicture', req.body, function ( err, results ) {
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

//upload resume
router.post( '/addUserResume/:studentID', checkAuth, ( req, res ) => {
    let upload = req.app.get( 'upload_Resume' );
    upload( req, res, err => {
        if ( err ) {
            console.log( "Error uploading resume", err );
            res.status( 400 ).end( 'Issue with uploading' )
        } else {
            console.log( "Inside upload", req.file, req.body );
            req.body.file = req.file
            req.body.params = req.params
            kafka.make_request( 'upload_resume', req.body, function ( err, results ) {
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

//remove student resume
router.delete( '/removeUserResume/:studentID', checkAuth, ( req, res ) => {
    req.body.params = req.params
    kafka.make_request( 'remove_resume', req.body, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 404 ).send( "No student found" )


        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );
} )

//update student primary resume
router.put( '/updateUserPrimaryResume/:studentID', checkAuth, ( req, res ) => {
    req.body.params = req.params
    kafka.make_request( 'updatePrimary_resume', req.body, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 404 ).send( "No student found" )


        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );
} )

//update student job preferences
router.put( '/updateUserJobPreferences/:studentID', checkAuth, ( req, res ) => {
    req.body.params = req.params
    kafka.make_request( 'students_updateJobPreferences', req.body, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 404 ).send( "No student found" )


        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );
} )

//update student demographics
router.put( '/updateUserDemographics/:studentID', checkAuth, ( req, res ) => {
    req.body.params = req.params
    kafka.make_request( 'students_updateDemographics', req.body, function ( err, results ) {
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