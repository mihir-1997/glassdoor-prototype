const employerSchema = require( '../../models/employers' );

function handle_request ( msg, callback ) {
    let req = {
        params: msg
    }

    employerSchema.find( {} ).select( 'name  views' ).then( docs => {
        let employers = JSON.parse( JSON.stringify( docs ) )
        let views_day = []
        employers.sort( ( a, b ) => {
            return b.views - a.views
        } );
        employers.forEach( element => {
            views_day.push( {
                "name": element.name,
                "Views/Day": element.views
            } )
        } );
        callback( null, views_day.slice( 0, 10 ) )
        // res.status( 200 ).send( JSON.stringify( doc ) )


    } ).catch( error => {
        console.log( "Error fetching employer by id ", error )
        callback( error, null )
        // res.status( 400 ).send( "Error fetching user about" )
    } )








}



exports.handle_request = handle_request;