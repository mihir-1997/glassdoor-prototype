var connection = new require( './kafka/Connection' );
var mongoose = require( './config/db_config' );

//topics files
//students
var students_signup = require( './services/students/signup' )
var students_login = require( './services/students/login' )
var students_getStudent = require( './services/students/getStudent' )
var students_updateBasicInfo = require( './services/students/updateBasicInfo' )
var students_updateAboutMe = require( './services/students/updateAboutMe' )
var students_addExperience = require( './services/students/addExperience' )
var students_updateExperience = require( './services/students/updateExperience' )
var students_removeExperience = require( './services/students/removeExperience' )
var students_updateSkills = require( './services/students/updateSkills' )
var students_addEducation = require( './services/students/addEducation' )
var students_updateEducation = require( './services/students//updateEducation' )
var students_removeEducation = require( './services/students/removeEducation' )
var student_upload_ProfilePicture = require( './services/students/uploadProfilePicture' )
var student_addResume = require( './services/students/addResume' )
var student_removeResume = require( './services/students/removeResume' )
var student_updatePrimaryResume = require( './services/students/updatePrimaryResume' )
var students_updateJobPreferences = require( './services/students/updateJobPreferences' )
var students_updateDemographics = require( './services/students/updateDemographics' )

//employers
var employer_signup = require( './services/employers/employer_signup' )
var employer_login = require( './services/employers/employer_login' )
var employer_getEmployerByName = require( './services/employers/employer_getEmployerByName' )
var employer_getEmployerById = require( './services/employers/employer_getEmployerById' )
var employer_updateEmployerBasicInfo = require( './services/employers/employer_updateEmployerBasicInfo' )
var employer_updateEmployerProfilePicture = require( './services/employers/employer_updateEmployerProfilePicture' )
var employer_getAllEmployers = require( './services/employers/employer_getAllEmployers' )
var employer_updateEmployerLogo = require( './services/employers/employer_updateEmployerLogo' )
//contrubutions
var contributions_addReview = require( './services/contributions/addReview' )
var contributions_removeReview = require( './services/contributions/removeReview' )
var contributions_getReview = require( './services/contributions/getReviewsbyStudent' )
var contributions_getReviewByEmployer = require( './services/contributions/getReviewsByEmployer' )
var contributions_helpfulReview = require( './services/contributions/helpfulReview' )
var contributions_replyToReview = require( './services/contributions/replyToReview' )
var contributions_updateReviewStatus = require( './services/contributions/updateReviewStatus' )
var contributions_markReviewAsFavourite = require( './services/contributions/markReviewAsFavourite' )
var contributions_markReviewAsFeatured = require( './services/contributions/markReviewAsFeatured' )

var contributions_addPhotos = require( './services/contributions/addPhotos' )
var contributions_updatePhotoStatus = require( './services/contributions/updatePhotoStatus' )
var contributions_getPhotosByEmployer = require( './services/contributions/getPhotosByEmployers' )
var contributions_getPhotosByStudent = require( './services/contributions/getPhotosbyStudents' )


var contributions_addSalary = require( './services/contributions/addSalaries' )
var contributions_getSalariesByEmployer = require( './services/contributions/getSalariesByEmployer' )
var contributions_getSalariesByStudent = require( './services/contributions/getSalariesByStudent' )

var contributions_addInterview = require( './services/contributions/addInterview' )
var contributions_getInterviewsByEmployer = require( './services/contributions/getInterviewByEmployers' )
var contributions_getInterviewsByStudent = require( './services/contributions/getInterviewByStudent' )


//jobs
var job_createJob = require( './services/jobs/job_createJob' )
var job_getJobsForEmployer = require( './services/jobs/job_getJobsForEmployer' )
var job_getAllJobs = require( './services/jobs/job_getAllJobs' )
var job_getJobsBasedOnTitle = require( './services/jobs/job_getJobsBasedOnTitle' )
var job_applyForJob = require( './services/jobs/job_applyForJob' )
var job_getApplicationStatus = require( './services/jobs/job_getApplicationStatus' )
var job_withdrawApplication = require( './services/jobs/job_withdrawApplication' )
var job_getListofApplicants = require( './services/jobs/job_getListofApplicants' )
var job_applicationStatusChange = require( './services/jobs/job_applicationStatusChange' )
var job_getJobsReport = require( './services/jobs/job_getJobsReport' )


//analytics
var admin_login = require( './services/analytics/adminLogin' )
var analytics_reviewsperday = require( './services/analytics/numberReviewPerDay' )


function handleTopicRequest ( topic_name, fname ) {
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer( topic_name );
    var producer = connection.getProducer();
    console.log( 'server is running ' );
    consumer.on( 'message', function ( message ) {
        console.log( "message:", message );
        console.log( 'message received for ' + topic_name + " ", fname );
        console.log( JSON.stringify( message.value ) );
        var data = JSON.parse( message.value );
        console.log( "data : ", data );
        fname.handle_request( data.data, function ( err, res ) {
            console.log( 'after handle' + res );
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify( {
                        correlationId: data.correlationId,
                        data: res
                    } ),
                    partition: 0
                }
            ];
            producer.send( payloads, function ( err, data ) {
                console.log( data );
            } );
            return;
        } );

    } );
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request

//students
handleTopicRequest( "students_signup", students_signup )
handleTopicRequest( "students_login", students_login )
handleTopicRequest( "students_getStudent", students_getStudent )
handleTopicRequest( "students_updateBasicInfo", students_updateBasicInfo )
handleTopicRequest( "students_updateAboutMe", students_updateAboutMe )
handleTopicRequest( "students_addExperience", students_addExperience )
handleTopicRequest( "students_removeExperience", students_removeExperience )
handleTopicRequest( "students_updateExperience", students_updateExperience )
handleTopicRequest( "students_updateSkills", students_updateSkills )
handleTopicRequest( "students_addEducation", students_addEducation )
handleTopicRequest( "students_updateEducation", students_updateEducation )
handleTopicRequest( "students_removeEducation", students_removeEducation )
handleTopicRequest( "upload_ProfilePicture", student_upload_ProfilePicture )
handleTopicRequest( "upload_resume", student_addResume )
handleTopicRequest( "remove_resume", student_removeResume )
handleTopicRequest( "updatePrimary_resume", student_updatePrimaryResume )
handleTopicRequest( "students_updateJobPreferences", students_updateJobPreferences )
handleTopicRequest( "students_updateDemographics", students_updateDemographics )

//employers
handleTopicRequest( "employer_signup", employer_signup )
handleTopicRequest( "employer_login", employer_login )
handleTopicRequest( "employer_getEmployerByName", employer_getEmployerByName )
handleTopicRequest( "employer_getEmployerById", employer_getEmployerById )
handleTopicRequest( "employer_updateEmployerBasicInfo", employer_updateEmployerBasicInfo )
handleTopicRequest( "employer_updateEmployerProfilePicture", employer_updateEmployerProfilePicture )
handleTopicRequest( "employer_getAllEmployers", employer_getAllEmployers )
handleTopicRequest( "employer_updateEmployerLogo", employer_updateEmployerLogo )
//contributions
//reviews
handleTopicRequest( "contributions_addReview", contributions_addReview )
handleTopicRequest( "contributions_removeReview", contributions_removeReview )
handleTopicRequest( "contributions_getReview", contributions_getReview )
handleTopicRequest( "contributions_getReviewByEmployer", contributions_getReviewByEmployer )
handleTopicRequest( "contributions_helpfulReview", contributions_helpfulReview )
handleTopicRequest( "contributions_replyToReview", contributions_replyToReview )
handleTopicRequest( "contributions_updateReviewStatus", contributions_updateReviewStatus )
handleTopicRequest( "contributions_markReviewAsFeatured", contributions_markReviewAsFeatured )
handleTopicRequest( "contributions_markReviewAsFavourite", contributions_markReviewAsFavourite )

//photos
handleTopicRequest( "contributions_addPhotos", contributions_addPhotos )
handleTopicRequest( "contributions_updatePhotoStatus", contributions_updatePhotoStatus )
handleTopicRequest( "contributions_getPhotosByStudent", contributions_getPhotosByStudent )
handleTopicRequest( "contributions_getPhotosByEmployer", contributions_getPhotosByEmployer )

//salaries
handleTopicRequest( "contributions_addSalary", contributions_addSalary )
handleTopicRequest( "contributions_getSalariesByEmployer", contributions_getSalariesByEmployer )
handleTopicRequest( "contributions_getSalariesByStudent", contributions_getSalariesByStudent )

//interviews
handleTopicRequest( "contributions_addInterview", contributions_addInterview )
handleTopicRequest( "contributions_getInterviewsByEmployer", contributions_getInterviewsByEmployer )
handleTopicRequest( "contributions_getInterviewsByStudent", contributions_getInterviewsByStudent )

//jobs
handleTopicRequest( "job_createJob", job_createJob )
handleTopicRequest( "job_getJobsForEmployer", job_getJobsForEmployer )
handleTopicRequest( "job_getAllJobs", job_getAllJobs )
handleTopicRequest( "job_getJobsBasedOnTitle", job_getJobsBasedOnTitle )
handleTopicRequest( "job_applyForJob", job_applyForJob )
handleTopicRequest( "job_getApplicationStatus", job_getApplicationStatus )
handleTopicRequest( "job_withdrawApplication", job_withdrawApplication )
handleTopicRequest( "job_getListofApplicants", job_getListofApplicants )
handleTopicRequest( "job_applicationStatusChange", job_applicationStatusChange )
handleTopicRequest( "job_getJobsReport", job_getJobsReport )

//analytics
handleTopicRequest( "admin_login", admin_login )
handleTopicRequest( "analytics_reviewsperday", analytics_reviewsperday )
