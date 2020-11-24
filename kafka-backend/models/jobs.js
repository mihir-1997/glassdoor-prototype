const mongoose = require( 'mongoose' )
var Schema = mongoose.Schema;

var applicantSchema = new Schema( {
    user_id: String,
    resume:Object,
    name:String,
    status: String,
    application_date:String,
    jobDate:String,
    salary:String,
    description:String,
    qualifications:String
} )

var jobsSchema = new Schema( {
    employerID:String,
    employerName:String,
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