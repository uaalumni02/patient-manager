import express from "express";
import mongoose from 'mongoose';
import moment from 'moment';

//import model
import AppointmentInformation from '../models/appointment';
import PatientInformation from '../models/patient';

const router = express.Router();

//add appts
router.addAppointment = ('/', (req, res, next) => {
    const currentdate = req.body.appointmentDate;
    const appointmentTimestamp = moment(currentdate, 'YYYY-MM-DD hh:mmA').unix();
    const appointmentInformation = new AppointmentInformation({
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
router.allAppointments = ('/', (req, res) => {
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
router.updateAppointmentInfo = ('/:id', (req, res) => {
    const id = req.params.patientId;
    const updateAppt = { 
        name: req.body.name, 
        attendees: req.body.attendees,
         location: req.body.location, 
         date: req.body.date, 
         time: req.body.time 
        };
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
router.removeAppointment = ('/:id', (req, res) => {
    const id = req.params.id;
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
router.searchAppointment = ('/:id', (req, res, next) => {
    const id = req.params.id;
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


export default router;