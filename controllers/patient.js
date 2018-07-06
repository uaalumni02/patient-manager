var PatientInformation = require('../models/patient');

var express = require("express");

var router = express.Router();

var mongoose = require('mongoose');

//shows all data
router.get_all_patients = ('/', (req, res) => {
    PatientInformation.find()
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

// Insert JSON straight into MongoDB
router.add_patients = ('/', (req, res, next) => {
    const isValidPatientName = (name) => {
        var regExp = /^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$/i
        return regExp.test(name)
      }
      const isValidEmail = (email) => {
        var regExp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,7})$/i;
        return regExp.test(email)
      }
      const isValidPhoneNumber = (phone) => {
        var regExp = /^[0-9+\(\)#\.\s\/ext-]+$/i;
        return regExp.test(phone)
      }
      const isValidAddress = (address) => {
        var regExp = /^(?=.*\d)[a-zA-Z\s\d\/]+$/i;
        return regExp.test(address)
      }
      const isValidMedication = (medication) => {
        var regExp = /^[a-z]{4,}$/i;
        return regExp.test(medication)
      }
      const isValidDiagnosis = (diagnosis) => {
        var regExp = /^[a-z]{3,}$/i;
        return regExp.test(diagnosis)
      }
      const isValidAdditionalInfo = (additionalInfo) => {
        var regExp = /^[a-z]{2,}$/i;
        return regExp.test(additionalInfo)
      }
    
    var patientInformation = new PatientInformation({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        medication: req.body.medication,
        diagnosis: req.body.diagnosis,
        additionalInfo: req.body.additionalInfo,
    });
    const { name, email, phone, address, medication, diagnosis,additionalInfo } = req.body;
    if (isValidPatientName(name) && isValidEmail(email) && isValidPhoneNumber(phone) && isValidAddress(address) && isValidMedication(medication) && isValidDiagnosis(diagnosis) && isValidAdditionalInfo(additionalInfo)) {
    patientInformation
        .save()
        .then(result => {
        })
        .catch(err => console.log(err));
    res.status(201).json({
        message: 'added to database',
        updatedPatient: patientInformation
    });
} else {
    return res.status(400).send('Please make sure proper data is entered');
}
});

//search by ID
router.search_patients = ('/:id', (req, res, next) => {
    var id = req.params.id;
    PatientInformation.findById({ '_id': id })
        .exec()
        .then(doc => {
            console.log("from database", doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: "No valid ID entered" });

            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
});

//remove patient from the db
router.remove_patient = ('/:id', (req, res) => {
    var id = req.params.id;
    PatientInformation.findOneAndDelete({ '_id': id })
        .exec()
        .then(result => {
            res.status(200).json(result);
            
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

//update patient information
router.update_patient = ('/:id', (req, res) => {
    var id = req.params.patientId;
    var updateOps = { name: req.body.name, email: req.body.email, phone: req.body.phone, address: req.body.address, medication: req.body.medication, diagnosis: req.body.diagnosis, additionalInfo: req.body.additionalInfo };
    PatientInformation.update({ $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});



module.exports = router;