const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var employerSchema = new Schema({
    
    name: String,
    email: String,
    address: String,
    profileImageUrl: String,
    logoImageUrl:String,
    views:Number,
    website: String,
    companySize: String,
    companyType: String,
    revenue: String,
    headquarter: String,
    industry: String,
    founded: String,
    mission: String,
    ceoname: String,

}
    , { collection: 'employers' }
);

module.exports = mongoose.model('employerSchema', employerSchema);  