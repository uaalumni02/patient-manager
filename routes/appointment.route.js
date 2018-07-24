import express from 'express';
import mongoose from 'mongoose';
import checkAuth from '../middleware/check-auth';
//import model
import AppointmentInformation from '../models/appointment';
// import controller
import appointmentController from '../controllers/appointment';

const router = express.Router();

//add appt data to db
router.post('/', checkAuth, appointmentController.addAppointment);
//show all appts
router.get('/', checkAuth, appointmentController.allAppointments);
//update appointment info
router.patch('/:id', checkAuth, appointmentController.updateAppointmentInfo);
//delete appt from the DB
router.delete('/:id', checkAuth, appointmentController.removeAppointment);
//search appt by ID
router.get('/:id', checkAuth, appointmentController.searchAppointment);

export default router;
