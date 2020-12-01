var bcrypt = require( 'bcrypt' );
const employerSchema = require( '../../models/employers' );
var connection = require( '../../config/db_config' ).connection;

function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }

    bcrypt.hash( req.body.password, 10, async ( err, hash ) => {



        let employer = new employerSchema( {
            name: req.body.name,
            email: req.body.email,
            address: "",
          profileImageUrl: "",
          logoImageUrl:"",
            views:0,
            website: "",
            companySize: "",
            companyType: "",
            revenue: "",
            headquarter: "",
            industry: "",
            founded: "",
            mission: "",
            ceoname: ""
        } )
        console.log(req.body.email);
        await employer.save().then( response => {
            console.log( "Employer signup successfull on MongoDB" )
            var sql = `insert into employers(mongoID,name,email,password) values(?,?,?,?)`;
            var values = [ ( response._id ).toHexString(), req.body.name, req.body.email, hash ];
            connection.query( sql, values, ( err, results ) => {
                if ( err ) {
                    console.log( "error in storing credentials in mysql", err );
                    callback( err, null )
                } else {
                    console.log( "Data stored in MySQL" + response._id )
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