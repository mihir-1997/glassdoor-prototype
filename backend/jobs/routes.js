var express = require( 'express' );
var bcrypt = require( 'bcrypt' );
var router = express.Router();
var mongoose = require( '../config/db_config' );
var jwt = require( 'jsonwebtoken' );
var { secret } = require( '../config/config' )
var { auth, checkAuth } = require( '../config/passport' )
auth();

//sample get
router.get( '/', ( req, res ) => {

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