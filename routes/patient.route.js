var express = require('express');
var mongoose = require('mongoose');
var checkAuth = require('../middleware/check-auth');
var app = express();

const router = express.Router();

//request model
var PatientInformation = require('../models/patient');

// import controller
var patientController = require('../controllers/patient');

//shows all data
router.get('/', patientController.get_all_patients);

// Insert JSON straight into MongoDB
router.post('/', checkAuth, patientController.add_patients )

//search DB by id
router.get('/:id', (req, res, next) => {
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

//remove docs from the db

router.delete('/:id', checkAuth, (req, res) => {
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

router.patch('/:id', checkAuth, (req, res) => {
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