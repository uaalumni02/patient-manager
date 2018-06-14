var express = require('express');
var mongoose = require('mongoose');

const router = express.Router();

//request model
var AppointmentInformation = require('../models/appointment');


//add appt data to db

router.post('/', (req, res, next) => {
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
router.get('/', (req, res) => {
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
router.patch('/:id', (req, res) => {
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


//delete appt from the DB
router.delete('/:id', (req, res) => {
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