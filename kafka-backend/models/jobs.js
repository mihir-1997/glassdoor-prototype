const mongoose = require( 'mongoose' )
var Schema = mongoose.Schema;

var applicantSchema = new Schema( {
    user_id: String,
    resume:Object,
    name:String,
    status: String,
    application_date:String
} )

var jobsSchema = new Schema( {
    employerID:String,
    name:String,
    title:String,
    industry:String,
    country:String,
    type:String,
    address:String,
    city:String,
    state:String,
    zip:String,
    applicants:[applicantSchema]
}
    , { collection: 'jobs' }
);

module.exports = mongoose.model( 'jobsSchema', jobsSchema );  