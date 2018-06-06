var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var patientInformationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    phone: String,
    address: String,
    medication: String,
    diagnosis: String,
    additionalInfo: String,
});



module.exports = mongoose.model('PatientInformation', patientInformationSchema);