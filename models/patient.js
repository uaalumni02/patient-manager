var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var patientInformationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true, min:2, max: 12},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    address: {type: String, required: true},
    medication: {type: String, required: true},
    diagnosis: {type: String, required: true},
    additionalInfo: {type: String, required: true},
});



module.exports = mongoose.model('PatientInformation', patientInformationSchema);