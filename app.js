require('dotenv').config();
var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

//request models
var PatientInformation = require('./models/patient');
var AppointmentInformation = require('./models/appointment');
var UserInformation = require('./models/user');

//importing routes
var patientRoutes = require('./routes/patient.route');
var appointmentRoutes = require('./routes/appointment.route');
var userRoutes = require('./routes/user.route');

var DB_URL = process.env.MONGO_URL;


// Connect to mongoose
mongoose.connect(DB_URL, (err) => {
    if (err)
        return console.log('Unable to Connect to MongoDB')
    return console.log('Connection Successful')
});

//middleware to parse request body
var bodyParser = require('body-parser');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middleware to utilize routes
app.use('/api/patient', patientRoutes);
app.use('/api/appointment', appointmentRoutes);
app.use('/api/user', userRoutes);


app.get('/', (req, res) => {
    res.send('Please use routes for application access');
});





app.listen(3000, () => console.log('server is running'));