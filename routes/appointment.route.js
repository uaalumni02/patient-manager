import express from 'express';
import mongoose from 'mongoose';
import checkAuth from '../middleware/check-auth';

const router = express.Router();

//request model
import AppointmentInformation from '../models/appointment';

// import controller
import appointmentController from '../controllers/appointment';

//add appt data to db
router.post('/', checkAuth, appointmentController.add_appointment);

//show all appts
router.get('/', checkAuth, appointmentController.all_appointments);

//update appointment info
router.patch('/:id', checkAuth, appointmentController.update_appointment_info);

//delete appt from the DB
router.delete('/:id', checkAuth, appointmentController.remove_appointment);

//search appt by ID
router.get('/:id', checkAuth, appointmentController.search_appointment);




module.exports = router;