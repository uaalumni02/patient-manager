import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const isValidPatientName = (name) => {
    const regExp = /^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$/i
    return regExp.test(name)
  };
  const isValidEmail = (email) => {
    const regExp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,7})$/i;
    return regExp.test(email)
  };
  const isValidPhoneNumber = (phone) => {
    const regExp = /^(1\s?)?((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$/i;
    return regExp.test(phone)
  };
  const isValidAddress = (address) => {
    const regExp = /^(?=.*\d)[a-zA-Z\s\d\/]+$/i;
    return regExp.test(address)
  };
  const isValidMedication = (medication) => {
    const regExp = /^[a-z]{4,}$/i;
    return regExp.test(medication)
  };
  const isValidDiagnosis = (diagnosis) => {
    const regExp = /^[a-z]{3,}$/i;
    return regExp.test(diagnosis)
  };
  const isValidAdditionalInfo = (additionalInfo) => {
    const regExp = /^[a-z]{2,}$/i;
    return regExp.test(additionalInfo)
  };
  const patientInformationSchema = mongoose.Schema({
    
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String, 
        required: [true, 'name is required'], 
        min:2, 
        max: 12,
        validate: [isValidPatientName, 'Please enter valid patient name'],
    },
    email: {
        type: String, 
        required: [true,'Email address is required'],
        validate: [isValidEmail, 'Please enter a valid email address'],
    },
    phone: {
        type: String, 
        required: [true, 'Phone number is requrired'],
        validate: [isValidPhoneNumber, 'Please enter a valid phone number'],
    },
    address: {
        type: String, 
        required: [true, 'address is required'],
        validate: [isValidAddress, 'Please enter a valid address'],
    },
    medication: {
        type: String, 
        required: true,
        validate: [isValidMedication, 'Please enter valid medication'],
    },
    diagnosis: {
        type: String, 
        required: [true, 'diagnosis is required'],
        validate: [isValidDiagnosis, 'Please enter valid diagnosis'],
    },
    additionalInfo: {
        type: String, 
        required: true,
        validate:  [isValidAdditionalInfo, 'Please enter valid additional information'],
    },
});



export default mongoose.model('PatientInformation', patientInformationSchema);


