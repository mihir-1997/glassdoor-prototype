const contributionsSchema = require( '../../models/contributions' );


function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }
    if ( req.body.firstTime ) {
        contributionsSchema.find( { $and: [ { "employerName": req.body.params.employerName }, { "type": "salary" } ] } ).then( doc => {
            var salary_by_job = {

            }
            var count = 0
            doc.forEach( sal => {
                count += 1
                let salary = JSON.parse( JSON.stringify( sal ) )
                if ( salary.jobTitle in salary_by_job ) {
                    if ( salary.baseSalary > salary_by_job[ salary.jobTitle ].max ) {
                        salary_by_job[ salary.jobTitle ].max = salary.baseSalary
                    }
                    if ( salary.baseSalary < salary_by_job[ salary.jobTitle ].min ) {
                        salary_by_job[ salary.jobTitle ].min = salary.baseSalary
                    }

                } else {
                    salary_by_job[ salary.jobTitle ] = {
                        min: salary.baseSalary,
                        max: salary.baseSalary
                    }

                }

            } )

            let stats = {
                totalCount: count,
                salary_by_jobTitle: salary_by_job,

            }
            contributionsSchema.find( { $and: [ { "employerName": req.body.params.employerName }, { "type": "salary" } ] } ).sort( { salaryDate: 'desc' } ).skip( 0 ).limit( req.body.pageSize ).then( doc => {

                callback( null, JSON.stringify( { salaryStats: stats, salary: doc } ) )
            } ).catch( error => {
                console.log( error )
                callback( error, null )
            } )

        } ).catch( error => {
            console.log( error )
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