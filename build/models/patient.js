'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var patientInformationSchema = _mongoose2.default.Schema;

var isValidPatientName = function isValidPatientName(name) {
    var regExp = /^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$/i;
    return regExp.test(name);
};
var isValidEmail = function isValidEmail(email) {
    var regExp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,7})$/i;
    return regExp.test(email);
};
var isValidPhoneNumber = function isValidPhoneNumber(phone) {
    var regExp = /^(1\s?)?((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$/i;
    return regExp.test(phone);
};
var isValidAddress = function isValidAddress(address) {
    var regExp = /^(?=.*\d)[a-zA-Z\s\d\/]+$/i;
    return regExp.test(address);
};
var isValidMedication = function isValidMedication(medication) {
    var regExp = /^[a-z]{4,}$/i;
    return regExp.test(medication);
};
var isValidDiagnosis = function isValidDiagnosis(diagnosis) {
    var regExp = /^[a-z]{3,}$/i;
    return regExp.test(diagnosis);
};
var isValidAdditionalInfo = function isValidAdditionalInfo(additionalInfo) {
    var regExp = /^[a-z]{2,}$/i;
    return regExp.test(additionalInfo);
};
var patientInformationSchema = _mongoose2.default.Schema({

    _id: _mongoose2.default.Schema.Types.ObjectId,
    name: {
        type: String,
        required: [true, 'name is required'],
        min: 2,
        max: 12,
        validate: [isValidPatientName, 'Please enter valid patient name']
    },
    email: {
        type: String,
        required: [true, 'Email address is required'],
        validate: [isValidEmail, 'Please enter a valid email address']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is requrired'],
        validate: [isValidPhoneNumber, 'Please enter a valid phone number']
    },
    address: {
        type: String,
        required: [true, 'address is required'],
        validate: [isValidAddress, 'Please enter a valid address']
    },
    medication: {
        type: String,
        required: true,
        validate: [isValidMedication, 'Please enter valid medication']
    },
    diagnosis: {
        type: String,
        required: [true, 'diagnosis is required'],
        validate: [isValidDiagnosis, 'Please enter valid diagnosis']
    },
    additionalInfo: {
        type: String,
        required: true,
        validate: [isValidAdditionalInfo, 'Please enter valid additional information']
    }
});

module.exports = _mongoose2.default.model('PatientInformation', patientInformationSchema);