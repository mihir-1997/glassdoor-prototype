const employerSchema = require( '../../models/employers' );

function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }
    employerSchema.findOneAndUpdate( { _id: req.body.params.employerId },
        {
            $set: {
                name: req.body.name,
                address: req.body.address,
                city: req.body.city,
                website: req.body.website,
                companySize: req.body.companySize,
                companyType: req.body.companyType,
                revenue: req.body.revenue,
                headquarter: req.body.headquarter,
                industry: req.body.industry,
                founded:req.body.founded,
                mission:req.body.mission,
                ceoname:req.body.ceoname
                

            }
        },{ new: true }
        ).then( response => {
            console.log( "Update successfull" )
            callback( null, response )
        } ).catch( error => {
            console.log( "Error in update", error )
            callback( error, null )
        } )
    







}



exports.handle_request = handle_request;