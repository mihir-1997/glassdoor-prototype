const contributionsSchema = require( '../../models/contributions' );


function handle_request ( msg, callback ) {
    let req = {
        params: msg
    }

    contributionsSchema.find( { "type": "review" } ).then( doc => {
        var reviews_per_day = {

        }
        var today = Date.now()
        for ( let i = 0; i < 7; i++ ) {
            let dateform = new Date( today - ( 86400000 * i ) )
            let day = dateform.getDate();
            let month = dateform.getMonth() + 1;
            // let year = dateform.getFullYear();
            let date = month + "/" + day
            reviews_per_day[ date ] = 0
        }

        var reviews_by_companies = {

        }
        var reviews_by_students = {

        }
        var ceo_rating = {

        }
        console.log( "reviews", reviews_per_day )
        //var count = doc.length
        var today = Date.now()
        doc.forEach( rev => {
            let review = JSON.parse( JSON.stringify( rev ) )
            let dateform = new Date( review.reviewDate )
            let day = dateform.getDate();
            let month = dateform.getMonth() + 1;
            //let year = dateform.getFullYear();
            let date = month + "/" + day
            if ( date in reviews_per_day ) {
                reviews_per_day[ date ] += 1
            }
            // reviews_per_day[ Math.floor( ( today - review.reviewDate ) / 86400000 ) ] += 1
            if ( review.employerName in reviews_by_companies ) {
                reviews_by_companies[ review.employerName ].total += 1
                reviews_by_companies[ review.employerName ].total_rating += review.rating
                reviews_by_companies[ review.employerName ].average_rating = reviews_by_companies[ review.employerName ].total_rating / reviews_by_companies[ review.employerName ].total

            } else {
                reviews_by_companies[ review.employerName ] = {
                    average_rating: review.rating,
                    total_rating: review.rating,
                    total: 1
                }


            }

            //change employer name to ceo name
            if ( review.employerName in ceo_rating ) {
                if ( review.approveCEO == true ) {
                    ceo_rating[ review.employerName ][ "positive" ] += 1
                }
                ceo_rating[ review.employerName ][ "total" ] += 1

            } else {
                ceo_rating[ review.employerName ] = { "positive": 0, "total": 1 }
                if ( review.approveCEO == true ) {
                    ceo_rating[ review.employerName ][ "positive" ] = 1
                }

            }

            if ( review.studentID in reviews_by_students ) {
                reviews_by_students[ review.studentID ] += 1
            } else if ( review.reviewStatus === "Pending" ) {
                reviews_by_students[ review.studentID ] = 1
            }
        } )
        let perday = []
        for ( let day in reviews_per_day ) {
            perday.push( {
                "name": day,
                "Reviews/Day": reviews_per_day[ day ]
            } )
        }

        callback( null, JSON.stringify( { analytics: { reviews_per_day: perday, reviews_by_companies: reviews_by_companies, reviews_by_students: reviews_by_students, ceo_rating: ceo_rating } } ) )
    } ).catch( error => {
        callback( error, null )
    } )




}

exports.handle_request = handle_request;