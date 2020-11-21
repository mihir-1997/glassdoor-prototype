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
    resumeID: String,
    isPrimary: Boolean,
    imageName: String,
    date: String,
    resumeName: String,
} )

var jobPreferenceSchema = new Schema( {
    searchStatus: String,
    jobTitle: String,
    targetSalary: String,
    openToRelocation: Boolean,
    typeOfIndustry: String,

} )

var userDemographicsSchema = new Schema( {
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
    aboutMe: String,
    experience: [ experienceSchema ],
    education: [ educationSchema ],
    skills: [ String ],
    resume: [ resumeSchema ],
    jobPreference: jobPreferenceSchema,
    userDemographics: userDemographicsSchema,
    profilePicture: String,

}
    , { collection: 'students' }
);

module.exports = mongoose.model( 'studentSchema', studentSchema );  