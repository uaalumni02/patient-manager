var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var patientInformation = new Schema({
    Name: String,
    Email: String,
    Phone: String,
    Address: String,
    Medication: String,
    Diagnosis: String,
    AdditionalInfo: String,
});

module.exports = mongoose.model('patientInformation', patientInformation);