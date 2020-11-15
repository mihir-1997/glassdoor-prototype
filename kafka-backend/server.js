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
var students_updateJobPreferences = require( './services/students/updateJobPreferences' )
var students_updateDemographics = require( './services/students/updateDemographics' )


function handleTopicRequest ( topic_name, fname ) {
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer( topic_name );
    var producer = connection.getProducer();
    console.log( 'server is running ' );
    consumer.on( 'message', function ( message ) {
        console.log( 'message received for ' + topic_name + " ", fname );
        console.log( JSON.stringify( message.value ) );
        var data = JSON.parse( message.value );

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
handleTopicRequest( "students_updateJobPreferences", students_updateJobPreferences )
handleTopicRequest( "students_updateDemographics", students_updateDemographics )



