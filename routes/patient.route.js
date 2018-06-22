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
router.post('/', checkAuth, patientController.add_patients);

//search DB by id
router.get('/:id', patientController.search_patients);


//remove patient from the db
router.delete('/:id', checkAuth, patientController.remove_patient);


 //update patient information
router.patch('/:id', checkAuth, patientController.update_patient);

module.exports = router;