const PORT = 3001;

var express = require( 'express' );
var bodyParser = require( 'body-parser' );
var mongoose = require( './config/db_config' );
var path = require( 'path' )
var app = express();
var session = require( "express-session" );
var cookieParser = require( "cookie-parser" );
var multer = require( 'multer' );
var aws = require( 'aws-sdk' );
var multerS3 = require( 'multer-s3' );
var cors = require( 'cors' );
var { frontend_url } = require( './config/config' )

//routes
var students = require( './students/routes' )
var employers = require( './employers/routes' )
var contributions = require( './contributions/routes' )
var jobs = require( './jobs/routes' )
var analytics = require( './analytics/routes' )


//Session management

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( cookieParser() );
app.use( express.static( 'public' ) )
app.use( cors( { origin: frontend_url, credentials: true } ) );
app.use(
    session( {
        key: 'glassdoor',
        secret: "cmpe_273_Glassdoor",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 6000000
        }
    } )
);


// image storage
// profile picture
const profileImage_storage = multer.diskStorage( {
    destination: './public/images/profilepics/',
    filename: function ( req, file, cb ) {
        cb(
            null,
            file.fieldname + '_' + Date.now() + path.extname( file.originalname )
        )
    }
} )

const upload_profileImage = multer( {
    storage: profileImage_storage
} ).single( 'myImage' )

app.set( "upload_profileImage", upload_profileImage );

//resume
const resume_storage = multer.diskStorage( {
    destination: './public/images/resumes/',
    filename: function ( req, file, cb ) {
        cb(
            null,
            file.fieldname + '_' + Date.now() + path.extname( file.originalname )
        )
    }
} )

const upload_Resume = multer( {
    storage: resume_storage
} ).single( 'myResume' )

app.set( "upload_Resume", upload_Resume );

//office photos
const photos_storage = multer.diskStorage( {
    destination: './public/images/officePhotos/',
    filename: function ( req, file, cb ) {
        cb(
            null,
            file.fieldname + '_' + Date.now() + path.extname( file.originalname )
        )
    }
} )

const upload_officePhotos = multer( {
    storage: photos_storage
} ).array( 'officePhotos', 10 )

app.set( "upload_officePhotos", upload_officePhotos );



//APIs

//routes
app.use( '/students', students );
app.use( '/employers', employers );
app.use( '/contributions', contributions );
app.use( '/analytics', analytics );
app.use( '/jobs', jobs );
app.use( '/public/images/resumes', express.static( path.join( __dirname, '/public/images/resumes' ) ) );
app.use( '/public/images/profilepics', express.static( path.join( __dirname, '/public/images/profilepics' ) ) );
app.use( '/public/images/officePhotos', express.static( path.join( __dirname, '/public/images/officePhotos' ) ) );

//starting the server
app.listen( PORT, () => {
    console.log( "Server listening on port: ", PORT );
} );


