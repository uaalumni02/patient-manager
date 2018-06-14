var express = require('express');
var mongoose = require('mongoose');

const router = express.Router();

//request model
var PatientInformation = require('../models/user');

//shows all data

router.get('/', (req, res) => {
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

//add info to db
router.post('/', (req, res, next) => {
    var patientInformation = new PatientInformation({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        password: req.body.password,
        
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



//remove docs from the db
router.delete('/:id', (req, res) => {
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




module.exports = router;