
import express from "express";
import mongoose from 'mongoose';
import PatientInformation from '../models/patient';
const router = express.Router();

//shows all data
router.getAllPatients = ('/', (req, res) => {
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
router.addPatients = ('/', (req, res, next) => {
    const patientInformation = new PatientInformation({
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
            if (result) {
                res.status(201).json({
                    Message: 'Added to databse'
                })
            } else {
                res.status(404).json({ Message: "Please enter valid information" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
});

//search by ID
router.searchPatients = ('/:id', (req, res, next) => {
    const id = req.params.id;
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
router.removePatient = ('/:id', (req, res) => {
    const id = req.params.id;
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
router.updatePatient = ('/:id', (req, res) => {
    const id = req.params.patientId;
    const updateOps = { 
        name: req.body.name, 
        email: req.body.email, 
        phone: req.body.phone, 
        address: req.body.address, 
        medication: req.body.medication, 
        diagnosis: req.body.diagnosis, 
        additionalInfo: req.body.additionalInfo, 
    };
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
export default router;
