'use strict';

var _patient = require('../models/patient');

var _patient2 = _interopRequireDefault(_patient);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

//shows all data
router.get_all_patients = ('/', function (req, res) {
    _patient2.default.find().exec().then(function (docs) {
        res.status(200).json(docs);
    }).catch(function (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

// Insert JSON straight into MongoDB
router.add_patients = ('/', function (req, res, next) {
    var patientInformation = new _patient2.default({
        _id: new _mongoose2.default.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        medication: req.body.medication,
        diagnosis: req.body.diagnosis,
        additionalInfo: req.body.additionalInfo
    });
    patientInformation.save().then(function (result) {
        if (result) {
            res.status(201).json({
                Message: 'Added to databse'
            });
        } else {
            res.status(404).json({ Message: "Please enter valid information" });
        }
    }).catch(function (err) {
        console.log(err);
        res.status(500).json({ error: err });
    });
});

//search by ID
router.search_patients = ('/:id', function (req, res, next) {
    var id = req.params.id;
    _patient2.default.findById({ '_id': id }).exec().then(function (doc) {
        console.log("from database", doc);
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({ message: "No valid ID entered" });
        }
    }).catch(function (err) {
        console.log(err);
        res.status(500).json({ error: err });
    });
});

//remove patient from the db
router.remove_patient = ('/:id', function (req, res) {
    var id = req.params.id;
    _patient2.default.findOneAndDelete({ '_id': id }).exec().then(function (result) {
        res.status(200).json(result);
    }).catch(function (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

//update patient information
router.update_patient = ('/:id', function (req, res) {
    var id = req.params.patientId;
    var updateOps = { name: req.body.name, email: req.body.email, phone: req.body.phone, address: req.body.address, medication: req.body.medication, diagnosis: req.body.diagnosis, additionalInfo: req.body.additionalInfo };
    _patient2.default.update({ $set: updateOps }).exec().then(function (result) {
        res.status(200).json(result);
    }).catch(function (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;