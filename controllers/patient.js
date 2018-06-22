var PatientInformation = require('../models/patient');

var express = require("express");

var router = express.Router();

var mongoose = require('mongoose');

//shows all data
router.get_all_patients =('/', (req, res) => {
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
    patientInformation
        .save()
        .then(result => {
        })
        .catch(err => console.log(err));
    res.status(201).json({
        message: 'added to database',
        updatedPatient: patientInformation
    });
});




module.exports = router;