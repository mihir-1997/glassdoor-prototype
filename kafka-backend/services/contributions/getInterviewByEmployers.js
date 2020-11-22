const contributionsSchema = require( '../../models/contributions' );


function handle_request ( msg, callback ) {
    let req = {
        params: msg
    }

    contributionsSchema.find( { $and: [ { "employerName": req.params.employerName }, { "type": "interview" } ] } ).then( doc => {
        var pos = 0
        var neu = 0
        var neg = 0
        var count = 0
        doc.forEach( inte => {
            count += 1
            let interview = JSON.parse( JSON.stringify( inte ) )
            if ( interview.overallExperience === "positive" ) {
                pos += 1
            }
            else if ( interview.overallExperience === "negative" ) {
                neg += 1
            } else if ( interview.overallExperience === "neutral" ) {
                neu += 1
            }
        } )

        let stats = {
            positive: ( pos / count ) * 100,
            negative: ( neg / count ) * 100,
            neutral: ( neu / count ) * 100
        }
        console.log( "stats", stats )
        callback( null, JSON.stringify( { interviewStats: stats, interview: doc } ) )
    } ).catch( error => {
        callback( error, null )
    } )




}

exports.handle_request = handle_request;