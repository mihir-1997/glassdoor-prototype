var bcrypt = require( 'bcrypt' );
const studentSchema = require( '../../models/students' );
var connection = require( '../../config/db_config' ).connection;

function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }

    bcrypt.hash( req.body.password, 10, ( err, hash ) => {



        let student = new studentSchema( {
            name: req.body.name,
            email: req.body.email,
            phoneNumber: "",
            address: "",
            city: "",
            zipcode: "",
            website: "",
            experience: [],
            education: [],
            skills: [],
            resume: [],
            jobPreference: {},
            userDemographics: {},
            profilePicture: "",

        } )

        student.save().then( response => {
            console.log( "Student signup successfull on MongoDB" )
            var sql = `insert into students(mongoID,name,email,password) values(?,?,?,?)`;
            var values = [ ( response._id ).toHexString(), req.body.name, req.body.email, hash ];
            connection.query( sql, values, ( err, results ) => {
                if ( err ) {
                    console.log( "error in storing credentials in mysql", err );
                    callback( err, null )
                } else {
                    console.log( "Data stored in MySQL" )
                    callback( null, response._id )
                }
            } );




        } ).catch( error => {
            console.log( "Error", error )
            callback( error, null )
        } )
    } )

}

exports.handle_request = handle_request;