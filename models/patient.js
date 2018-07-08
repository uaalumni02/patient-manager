var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var patientInformationSchema = mongoose.Schema;

const isValidPatientName = (name) => {
    var regExp = /^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$/i
    return regExp.test(name)
  };
  const isValidEmail = (email) => {
    var regExp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,7})$/i;
    return regExp.test(email)
  };
  const isValidPhoneNumber = (phone) => {
    var regExp = /^[0-9+\(\)#\.\s\/ext-]+$/i;
    return regExp.test(phone)
  };
  const isValidAddress = (address) => {
    var regExp = /^(?=.*\d)[a-zA-Z\s\d\/]+$/i;
    return regExp.test(address)
  };
  const isValidMedication = (medication) => {
    var regExp = /^[a-z]{4,}$/i;
    return regExp.test(medication)
  };
  const isValidDiagnosis = (diagnosis) => {
    var regExp = /^[a-z]{3,}$/i;
    return regExp.test(diagnosis)
  };
  const isValidAdditionalInfo = (additionalInfo) => {
    var regExp = /^[a-z]{2,}$/i;
    return regExp.test(additionalInfo)
  };
  var patientInformationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String, 
        required: true, 
        min:2, 
        max: 12,
        validate: [isValidPatientName, 'Please enter valid patient name'],
        match: [/^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$/i, 'Please enter a valid patient name']
    },
    email: {
        type: String, 
        required: [true,'Email address is required'],
        validate: [isValidEmail, 'Please enter a valid email address'],
        match: [/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,7})$/i, 'Please enter a valid email address']
    },
    phone: {
        type: String, 
        required: true,
        validate: [isValidPhoneNumber, 'Please enter a valid phone number'],
        match: [/^[0-9+\(\)#\.\s\/ext-]+$/i, 'Please enter a valid phone number']
    },
    address: {
        type: String, 
        required: true,
        validate: [isValidAddress, 'Please enter a valid address'],
        match: [/^(?=.*\d)[a-zA-Z\s\d\/]+$/i, 'Please enter a valid address']
    },
    medication: {
        type: String, 
        required: true,
        validate: [isValidMedication, 'Please enter valid medication'],
        match:  [/^[a-z]{4,}$/i, 'Please enter valid medication']
    },
    diagnosis: {
        type: String, 
        required: true,
        validate: [isValidDiagnosis, 'Please enter valid diagnosis'],
        match: [/^[a-z]{3,}$/i, 'Please enter valid diagnosis']
    },
    additionalInfo: {
        type: String, 
        required: true,
        validate:  [isValidAdditionalInfo, 'Please enter valid additional information'],
        match: [/^[a-z]{2,}$/i, 'Please enter valid additionall information']
    },
});

module.exports = mongoose.model('PatientInformation', patientInformationSchema);