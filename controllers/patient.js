var PatientInformation = require('../models/patient');

var express = require("express");

var router = express.Router();


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



module.exports = router;