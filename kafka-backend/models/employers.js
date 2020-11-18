const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var employerSchema = new Schema({
    
    name: String,
    email: String,
    address: String,
    profileImageUrl: String,
    website: String,
    companySize: Number,
    companyType: String,
    revenue: Number,
    headquarter: String,
    industry: String,
    founded: String,
    mission: String,
    ceoname: String,

}
    , { collection: 'employers' }
);

module.exports = mongoose.model('employerSchema', employerSchema);  