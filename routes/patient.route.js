import express from 'express';
import mongoose from 'mongoose';
import checkAuth from '../middleware/check-auth';
const app = express();

const router = express.Router();

//import model
import PatientInformation from '../models/patient';

// import controller
import patientController from '../controllers/patient';

//shows all data
router.get('/', checkAuth, patientController.getAllPatients);

// Insert JSON straight into MongoDB
router.post('/', checkAuth, patientController.addPatients);

//search DB by id
router.get('/:id', checkAuth, patientController.searchPatients);


//remove patient from the db
router.delete('/:id', checkAuth, patientController.removePatient);


 //update patient information
router.patch('/:id', checkAuth, patientController.update_patient);

module.exports = router;