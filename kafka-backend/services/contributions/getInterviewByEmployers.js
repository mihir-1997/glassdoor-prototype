const contributionsSchema = require( '../../models/contributions' );


function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }
    if ( req.body.firstTime ) {
        contributionsSchema.find( { $and: [ { "employerName": req.body.params.employerName }, { "type": "interview" } ] } ).then( doc => {
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
                totalCount: count,
                positive: ( pos / count ) * 100,
                negative: ( neg / count ) * 100,
                neutral: ( neu / count ) * 100
            }
            contributionsSchema.find( { $and: [ { "employerName": req.body.params.employerName }, { "type": "interview" } ] } ).sort( { interviewDate: 'desc' } ).skip( 0 ).limit( req.body.pageSize ).then( doc => {

                callback( null, JSON.stringify( { interviewStats: stats, interview: doc } ) )
            } ).catch( error => {
                callback( error, null )
            } )
        } ).catch( error => {
            callback( error, null )
        } )

    } else {
        contributionsSchema.find( { $and: [ { "employerName": req.body.params.employerName }, { "type": "interview" } ] } ).sort( { interviewDate: 'desc' } ).skip( ( req.body.pageNumber - 1 ) * req.body.pageSize ).limit( req.body.pageSize ).then( doc => {
            let stats = {}
            callback( null, JSON.stringify( { interviewStats: stats, interview: doc } ) )
        } ).catch( error => {
            callback( error, null )
        } )

    }




}

exports.handle_request = handle_request;