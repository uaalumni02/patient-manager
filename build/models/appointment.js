'use strict';

var _attendees, _location;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Schema = _mongoose2.default.Schema;

var appointmentInformationSchema = _mongoose2.default.Schema;

var isValidAttendees = function isValidAttendees(attendees) {
    var regExp = /^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$/i;
    return regExp.test(attendees);
};
var isValidPatientLocation = function isValidPatientLocation(location) {
    var regExp = /^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$/i;
    return regExp.test(location);
};

var isValidPatientDateTime = function isValidPatientDateTime(time) {
    var regExp = /^\d\d\d\d-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01]) (00|[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9])$/i;
    return regExp.test(time);
};

var appointmentInformationSchema = _mongoose2.default.Schema({
    patientId: {
        type: Schema.Types.ObjectId
    },
    attendees: (_attendees = {
        type: String,
        required: true
    }, _defineProperty(_attendees, 'required', [true, 'Attendees are required']), _defineProperty(_attendees, 'validate', [isValidAttendees, 'Please enter attendees']), _attendees),
    location: (_location = {
        type: String,
        required: true
    }, _defineProperty(_location, 'required', [true, 'Location is required']), _defineProperty(_location, 'validate', [isValidPatientLocation, 'Please enter location']), _location),
    appointmentDate: {
        type: Number,
        required: true

    }

});

module.exports = _mongoose2.default.model('AppointmentInformation', appointmentInformationSchema);