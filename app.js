require('dotenv').config();
var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

//request models
var PatientInformation = require('./models/patient');

var DB_URL = process.env.MONGO_URL;


// Connect to mongoose
mongoose.connect(DB_URL, (err) => {
    if (err)
        return console.log('Unable to Connect to MongoDB')
    return console.log('Connection Successful')
});

//middleware to parse request body
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Please use routes for application access');
});

app.get('/api/allData', (req, res) => {
    PatientInformation.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

// Insert JSON straight into MongoDB

app.post('/api/add', (req, res, next) => {
    var patientInformation = new PatientInformation({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        medication: req.body.medication,
        diagnosis: req.body.diagnosis,
        additionalInfo: req.body.additionalInfo,
    });
    patientInformation
        .save()
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));
    res.status(201).json({
        message: 'added to database',
        updatedPatient: patientInformation
    });
});

//search DB by id

app.get('/api/search', (req, res, next) => {
    var id = req.query.q;
    PatientInformation.findById(id)
        .exec()
        .then(doc => {
            console.log("from database", doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: "No valid ID entered" });

            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
});


//remove docs from the db; based on name query localhost:3000/enter name to remove

app.delete('/:removeData', (req, res) => {
    var name = req.params.removeData;
    PatientInformation.remove({ name: name })
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

//update data query by name /?q=

app.patch('/:updateData', (req, res) => {
    var query = req.query.q;
    var myquery = { name: '' + query };
    var newvalues = { $set: { name: req.body.name, email: req.body.email, phone: req.body.phone, address: req.body.address, medication: req.body.medication, diagnosis: req.body.diagnosis, additionalInfo: req.body.additionalInfo } };
    console.log(newvalues)
    PatientInformation.update(myquery, newvalues)
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
