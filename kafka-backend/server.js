var connection = new require( './kafka/Connection' );
var mongoose = require( './config/db_config' );

//topics files
//students
var students_signup = require( './services/students/signup' )
var students_login = require( './services/students/login' )
var students_getStudent = require( './services/students/getStudent' )


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
