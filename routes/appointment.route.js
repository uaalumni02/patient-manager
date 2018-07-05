var express = require('express');
var mongoose = require('mongoose');
var checkAuth = require('../middleware/check-auth');

const router = express.Router();

//request model
var AppointmentInformation = require('../models/appointment');

// import controller
var appointmentController = require('../controllers/appointment');

//add appt data to db
router.post('/', checkAuth, appointmentController.add_appointment);

//show all appts
router.get('/', checkAuth, appointmentController.all_appointments);

//update appointment info
router.patch('/:id', checkAuth, appointmentController.update_appointment_info);

//delete appt from the DB
router.delete('/:id', checkAuth, appointmentController.remove_appointment);




module.exports = router;