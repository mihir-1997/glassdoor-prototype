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
var { frontend_url } = require( './config' )

//routes
var students = require( './students/routes' )
var employers = require( './employers/routes' )
var reviews = require( './reviews/routes' )
var jobs = require( './jobs/routes' );



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


//APIs

//routes
app.use( '/students', students );
app.use( '/employers', employers );
app.use( '/reviews', reviews );
app.use( '/jobs', jobs );


//starting the server
app.listen( PORT, () => {
    console.log( "Server listening on port: ", PORT );
} );


