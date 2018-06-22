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




module.exports = router;