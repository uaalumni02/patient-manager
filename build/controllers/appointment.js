'use strict';

var _patient = require('../models/patient');

var _patient2 = _interopRequireDefault(_patient);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _appointment = require('../models/appointment');

var _appointment2 = _interopRequireDefault(_appointment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

//import model


//add appts
router.add_appointment = ('/', function (req, res, next) {
    var currentdate = req.body.appointmentDate;
    var appointmentTimestamp = (0, _moment2.default)(currentdate, 'YYYY-MM-DD hh:mmA').unix();

    var appointmentInformation = new _appointment2.default({
        patientId: req.body.patientId,
        attendees: req.body.attendees,
        location: req.body.location,
        appointmentDate: appointmentTimestamp
    });
    appointmentInformation.save().then(function (result) {
        _patient2.default.findById(result.patientId).exec().then(function (patientData) {
            console.log(patientData);
            res.status(201).json({
                message: 'added to database',
                updatedAppointment: appointmentInformation,
                patient: patientData
            });
        }).catch(function (err) {
            console.log(err.message);
        });
    }).catch(function (err) {
        return console.log(err);
    });
});

//show all appts
router.all_appointments = ('/', function (req, res) {
    _appointment2.default.find().exec().then(function (docs) {
        res.status(200).json(docs);
    }).catch(function (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

//update appointment info
router.update_appointment_info = ('/:id', function (req, res) {
    var id = req.params.patientId;
    var updateAppt = { name: req.body.name, attendees: req.body.attendees, location: req.body.location, date: req.body.date, time: req.body.time };
    _appointment2.default.update({ $set: updateAppt }).exec().then(function (result) {
        res.status(200).json(result);
    }).catch(function (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

//remove appointment
router.remove_appointment = ('/:id', function (req, res) {
    var id = req.params.id;
    _appointment2.default.findOneAndDelete({ '_id': id }).exec().then(function (result) {
        res.status(200).json({
            message: 'removed from database'
        });
    }).catch(function (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

//search appt by ID
router.search_appointment = ('/:id', function (req, res, next) {
    var id = req.params.id;
    _appointment2.default.findById({ '_id': id }).exec().then(function (doc) {
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

module.exports = router;