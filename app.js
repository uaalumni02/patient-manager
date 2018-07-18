require('dotenv').config();
import express from 'express';
import bodyparser from 'body-parser';
import mongoose  from 'mongoose';
const app = express();

//import models

import PatientInformation from './models/patient';
import AppointmentInformation from './models/appointment';
import UserInformation from './models/user';

//import routes

import patientRoutes from './routes/patient.route';
import appointmentRoutes  from './routes/appointment.route';
import userRoutes from './routes/user.route';
import routes from './controllers/patient';


var DB_URL = process.env.MONGO_URL;


// Connect to mongoose
mongoose.connect(DB_URL, (err) => {
    if (err)
        return console.log('Unable to Connect to MongoDB')
    return console.log('Connection Successful')
});

//middleware to parse request body
import bodyParser from 'body-parser';
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middleware to utilize routes
app.use('/api/patient', patientRoutes);
app.use('/api/appointment', appointmentRoutes);
app.use('/api/user', userRoutes);
app.use('/api/patient', routes);


app.get('/', (req, res) => {
    res.send('Please use routes for application access');
});



app.listen(3000, () => console.log('server is running'));