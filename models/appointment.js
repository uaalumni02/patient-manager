var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var appointmentInformationSchema = mongoose.Schema({
    patientId: { type: Schema.Types.ObjectId },
    attendees: {
        type: String, 
        required: true
    },
    location: {
        type: String, 
        required: true
    },
    date: {
        type: String, 
        required: true
    },
    time: {
        type: String, 
        required: true
    },

});

module.exports = mongoose.model('AppointmentInformation', appointmentInformationSchema);