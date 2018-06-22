var PatientInformation = require('../models/appointment');

var express = require("express");

var router = express.Router();

var mongoose = require('mongoose');

//request model
var AppointmentInformation = require('../models/appointment');


//add appts
router.add_appointment = ('/', (req, res, next) => {
    var appointmentInformation = new AppointmentInformation({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        attendees: req.body.attendees,
        location: req.body.location,
        date: req.body.date,
        time: req.body.time,
    });
    appointmentInformation
        .save()
        .then(result => {
        })
        .catch(err => console.log(err));
    res.status(201).json({
        message: 'added to database',
        updatedAppointment: appointmentInformation
    });
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