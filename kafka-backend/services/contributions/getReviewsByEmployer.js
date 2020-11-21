const contributionsSchema = require( '../../models/contributions' );


function handle_request ( msg, callback ) {
    let req = {
        params: msg
    }

    contributionsSchema.find( { $and: [ { "employerID": req.params.employerID }, { "type": "review" } ] } ).then( doc => {
        var overallRating = 0
        var averageRecommended = 0
        var averageCEOApproval = 0
        var count = 0
        doc.forEach( rev => {
            let review = JSON.parse( JSON.stringify( rev ) )
            count += 1
            overallRating += review.rating
            if ( review.recommended == true ) {
                averageRecommended += 1
            }
            if ( review.approveCEO == true ) {
                averageCEOApproval += 1
            }
        } )

        let stats = {
            avarageRatings: overallRating / count,
            averageRecommended: ( averageRecommended / count ) * 100,
            averageCEOApproval: ( averageCEOApproval / count ) * 100,
        }
        console.log( "stats", stats )
        callback( null, JSON.stringify( { reviewStats: stats, review: doc } ) )
    } ).catch( error => {
        callback( error, null )
    } )




}

exports.handle_request = handle_request;