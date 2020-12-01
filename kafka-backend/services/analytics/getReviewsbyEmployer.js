const contributionsSchema = require( '../../models/contributions' );


function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }
    if ( req.body.firstTime ) {
        contributionsSchema.find( { $and: [ { "employerName": req.body.params.employerName }, { "type": "review" } ] } ).then( doc => {
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
                totalCount: count,
                avarageRatings: overallRating / count,
                averageRecommended: ( averageRecommended / count ) * 100,
                averageCEOApproval: ( averageCEOApproval / count ) * 100,
            }
            contributionsSchema.find( { $and: [ { "employerName": req.body.params.employerName }, { "type": "review" } ] } ).sort( { reviewDate: 'desc' } ).skip( ( 0 ) ).limit( req.body.pageSize ).then( doc => {

                callback( null, JSON.stringify( { reviewStats: stats, review: doc } ) )
            } ).catch( error => {
                callback( error, null )
            } )

        } ).catch( error => {
            callback( error, null )
        } )


    } else {

        contributionsSchema.find( { $and: [ { "employerName": req.body.params.employerName }, { "type": "review" } ] } ).sort( { reviewDate: 'desc' } ).skip( ( req.body.pageNumber - 1 ) * req.body.pageSize ).limit( req.body.pageSize ).then( doc => {
            let stats = {}
            callback( null, JSON.stringify( { reviewStats: stats, review: doc } ) )
        } ).catch( error => {
            callback( error, null )
        } )


    }

}

exports.handle_request = handle_request;