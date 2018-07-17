var PatientInformation = require('../models/patient');

var express = require("express");

var router = express.Router();

var mongoose = require('mongoose');

var moment = require('moment');

//request model
var AppointmentInformation = require('../models/appointment');

//add appts
router.add_appointment = ('/', (req, res, next) => {
    var currentdate = req.body.appointmentDate;
    var appointmentTimestamp = moment(currentdate, 'YYYY-MM-DD hh:mmA').unix();

    var appointmentInformation = new AppointmentInformation({
        patientId: req.body.patientId,
        attendees: req.body.attendees,
        location: req.body.location,
        appointmentDate: appointmentTimestamp,
    });
    appointmentInformation
        .save()
        .then(result => {
            PatientInformation.findById(result.patientId)
                .exec()
                .then(patientData => {
                    console.log(patientData)
                    res.status(201).json({
                        message: 'added to database',
                        updatedAppointment: appointmentInformation,
                        patient: patientData
                    });
                })
                .catch((err) => {
                    console.log(err.message)
                })
        })
        .catch(err => console.log(err));

});

//show all appts
router.all_appointments = ('/', (req, res) => {
    AppointmentInformation.find()
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

//update appointment info
router.update_appointment_info = ('/:id', (req, res) => {
    var id = req.params.patientId;
    var updateAppt = { name: req.body.name, attendees: req.body.attendees, location: req.body.location, date: req.body.date, time: req.body.time };
    AppointmentInformation.update({ $set: updateAppt })
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

//remove appointment
router.remove_appointment = ('/:id', (req, res) => {
    var id = req.params.id;
    AppointmentInformation.findOneAndDelete({ '_id': id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'removed from database',
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

//search appt by ID
router.search_appointment = ('/:id', (req, res, next) => {
    var id = req.params.id;
    AppointmentInformation.findById({ '_id': id })
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


module.exports = router;