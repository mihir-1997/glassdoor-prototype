const jobSchema = require('../../models/jobs');

function handle_request(msg, callback) {
    let req = {
        params: msg
    }

    let stats = [{}];
    jobSchema.find({ employerID: req.params.employerID }).then(doc => {
        doc.forEach(jobs => {
            console.log("######", jobs.employerName);
            let total = 0;
            let hired = 0;
            let rejected = 0;
            let inProcess = 0;
            let male = 0;
            let female = 0;
            let disabled = 0;
            let veterans = 0;
            let  IndigenousAmerican=0;
            let EastAsian=0;
            let SouthAsian=0;
            let SoutheastAsian=0;
            let NativeHawaiian=0;
            let MiddleEastern=0;
            let Black=0;
            let Hispanic=0;
            let White=0;
            jobs.applicants.forEach(application => {
                total++;
                if (application.status === "Hired") {
                    hired++;
                }
                if (application.status === "Rejected") {
                    rejected++;
                }

                if (application.gender === "Man") {
                    male++;
                }
                else {
                    female++;
                }

                if (application.disability === "Yes") {
                    disabled++;
                }
                if (application.veteranStatus === "Yes") {
                    veterans++;
                }
                switch(application.ethnicity)
                {
                    case "Indigenous American or Alaska Native":
                        IndigenousAmerican++;
                        break;
                    case "East Asian":
                        EastAsian++;
                        break;
                    case "South Asian":
                        SouthAsian++;
                        break;
                    case "Southeast Asian":
                        SoutheastAsian++;
                        break;
                    case "Native Hawaiian or Other Pacific Islander":
                        NativeHawaiian++;
                        break;
                    case "Middle Eastern":
                        MiddleEastern++;
                        break;
                    case "Black or African American":
                        Black++;
                        break;
                    case "Hispanic or Latinx":
                        Hispanic++;
                        break;
                    case "White":
                        White++;
                        break;
                }
            })
            inProcess = total - hired - rejected
            stats.push(
                {
                    "jobID": jobs._id,
                    "total": total,
                    "hired": hired,
                    "rejected": rejected,
                    "inProcess": inProcess,
                    "jobName": jobs.title,
                    "disabled":disabled,
                    "male":male,
                    "female":female,
                    "veterans":veterans,
                    "IndigenousAmerican": IndigenousAmerican,
                    "EastAsian":EastAsian,
                    "SouthAsian":SouthAsian,
                    "SoutheastAsian":SoutheastAsian,
                    "NativeHawaiian":NativeHawaiian,
                    "MiddleEastern":MiddleEastern,
                    "Black":Black,
                    "Hispanic":Hispanic,
                    "White":White
                })

        })

        // console.log( "User", doc )
        callback(null, stats)
        // res.status( 200 ).send( JSON.stringify( doc ) )


    }).catch(error => {
        console.log("Error fetching jobs by employer id ", error)
        callback(error, null)
        // res.status( 400 ).send( "Error fetching user about" )
    })








}



exports.handle_request = handle_request;