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
router.get('/', appointmentController.all_appointments);


//update appointment info
router.patch('/:id', checkAuth, appointmentController.update_appointment_info);

//delete appt from the DB
router.delete('/:id', checkAuth, (req, res) => {
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