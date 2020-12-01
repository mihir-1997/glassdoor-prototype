const mongoose = require( 'mongoose' )
var Schema = mongoose.Schema;

var applicantSchema = new Schema( {
    studentID: String,
    resumeID:String,
    resumeName:String,
    name:String,
    status: String,
    imageName:String,
    ethnicity: String,
    gender: String,
    disability: String,
    veteranStatus: String,
    application_date:Date,

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
    salary:String,
    description:String,
    qualifications:String,
    responsibilities:String,
    date:Date,
    applicants:[applicantSchema]
}
    , { collection: 'jobs' }
);

module.exports = mongoose.model( 'jobsSchema', jobsSchema );  