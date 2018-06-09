var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var appointmentInformationSchema = mongoose.Schema({
    name: String,
    attendees: String,
    location: String,
    date: String,
    time: String,
    
});

module.exports = mongoose.model('AppointmentInformation', appointmentInformationSchema);