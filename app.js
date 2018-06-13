require('dotenv').config();
var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

//request models
var PatientInformation = require('./models/patient');
var AppointmentInformation = require('./models/appointment');

var patientRoutes = require('./routes/patient.route');

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

app.use('/api/patient', patientRoutes);


app.get('/', (req, res) => {
    res.send('Please use routes for application access');
});




//add appt data to db

app.post('/api/appointment', (req, res, next) => {
    var appointmentInformation = new AppointmentInformation({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        attendees: req.body.attendees,
        location: req.body.location,
        date: req.body.date,
        time: req.body.time,
    });
    appointmentInformation
        .save()
        .then(result => {
        })
        .catch(err => console.log(err));
    res.status(201).json({
        message: 'added to database',
        updatedAppointment: appointmentInformation
    });
});

//show all appts
app.get('/api/appointment', (req, res) => {
    AppointmentInformation.find()
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


//update appointment info
app.patch('/api/appointment/:id', (req, res) => {
    var id = req.params.patientId;
    var updateAppt = { name: req.body.name, attendees: req.body.attendees, location: req.body.location, date: req.body.date, time: req.body.time };
    AppointmentInformation.update({ $set: updateAppt })
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


//delete appt from the DB
app.delete('/api/appointment/:id', (req, res) => {
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


app.listen(3000, () => console.log('server is running'));