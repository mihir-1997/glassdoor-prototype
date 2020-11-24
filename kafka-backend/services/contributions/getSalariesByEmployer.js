const contributionsSchema = require( '../../models/contributions' );


function handle_request ( msg, callback ) {
    let req = {
        params: msg
    }

    contributionsSchema.find( { $and: [ { "employerName": req.params.employerName }, { "type": "salary" } ] } ).then( doc => {
        var min = 1000000
        var max = 0
        doc.forEach( sal => {
            let salary = JSON.parse( JSON.stringify( sal ) )
            if ( salary.baseSalary > max ) {
                max = salary.baseSalary
            }
            if ( salary.baseSalary < min ) {
                min = salary.baseSalary
            }
        } )

        let stats = {
            minimum_salary: min,
            maximum_salary: max
        }
        console.log( "stats", stats )
        callback( null, JSON.stringify( { salaryStats: stats, salary: doc } ) )
    } ).catch( error => {
        callback( error, null )
    } )




}

exports.handle_request = handle_request;