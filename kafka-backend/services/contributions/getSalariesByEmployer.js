const contributionsSchema = require( '../../models/contributions' );


function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }
    if ( req.body.firstTime ) {
        contributionsSchema.find( { $and: [ { "employerName": req.body.params.employerName }, { "type": "salary" } ] } ).then( doc => {
            var min = 1000000
            var max = 0
            var count = 0
            doc.forEach( sal => {
                count += 1
                let salary = JSON.parse( JSON.stringify( sal ) )
                if ( salary.baseSalary > max ) {
                    max = salary.baseSalary
                }
                if ( salary.baseSalary < min ) {
                    min = salary.baseSalary
                }
            } )

            let stats = {
                totalCount: count,
                minimum_salary: min,
                maximum_salary: max
            }
            contributionsSchema.find( { $and: [ { "employerName": req.body.params.employerName }, { "type": "salary" } ] } ).sort( { salaryDate: 'desc' } ).skip( 0 ).limit( req.body.pageSize ).then( doc => {

                callback( null, JSON.stringify( { salaryStats: stats, salary: doc } ) )
            } ).catch( error => {
                callback( error, null )
            } )

        } ).catch( error => {
            callback( error, null )
        } )


    } else {
        contributionsSchema.find( { $and: [ { "employerName": req.body.params.employerName }, { "type": "salary" } ] } ).sort( { salaryDate: 'desc' } ).skip( ( req.body.pageNumber - 1 ) * req.body.pageSize ).limit( req.body.pageSize ).then( doc => {
            let stats = {}
            callback( null, JSON.stringify( { salaryStats: stats, salary: doc } ) )
        } ).catch( error => {
            callback( error, null )
        } )

    }


}

exports.handle_request = handle_request;