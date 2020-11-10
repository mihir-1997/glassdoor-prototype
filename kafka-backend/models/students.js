const mongoose = require( 'mongoose' )
var Schema = mongoose.Schema;

var experienceSchema = new Schema( {
    experienceID: String,
    companyName: String,
    jobTitle: String,
    jobStartDate: String,
    jobEndDate: String,
    jobLocation: String,
    jobDescription: String
} )

var educationSchema = new Schema( {
    educationID: String,
    collegeName: String,
    degree: String,
    major: String,
    collegeLocation: String,
    collegeStartDate: String,
    collegeEndDate: String,
    collegeDescription: String,

} )

var resumeSchema = new Schema( {
    isPrimary: Boolean,
    resumeName: String,
} )

var jobPreferenceSchema = new Schema( {
    jobPreferenceID: String,
    searchStatus: String,
    jobTitle: String,
    targetSalary: String,
    openToRelocation: Boolean,
    typeOfIndustry: String,

} )

var userDemographicsSchema = new Schema( {
    userDemographicsID: String,
    ethnicity: String,
    gender: String,
    disability: String,
    veteranStatus: String,

} )

var studentSchema = new Schema( {
    name: String,
    email: String,
    phoneNumber: Number,
    address: String,
    city: String,
    zipcode: String,
    website: String,
    experience: [ experienceSchema ],
    education: [ educationSchema ],
    skills: [ String ],
    resume: [ resumeSchema ],
    jobPreference: [ jobPreferenceSchema ],
    userDemographics: [ userDemographicsSchema ],
    profilePicture: String,

}
    , { collection: 'students' }
);

module.exports = mongoose.model( 'studentSchema', studentSchema );  