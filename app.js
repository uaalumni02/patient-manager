require('dotenv').config();
var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

//request models
var patient = require('./models/patient');

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

app.post('/api/add', (req, res) => {
     // Insert JSON straight into MongoDB
     mongoose.connect(DB_URL, function(err, db) {
        if(err) { throw err;  }
        var collection = db.collection('patientInformation');
        var patientInfo = {  Name: req.body.Name,  Email:req.body.Email, Phone: req.body.Phone, Address:req.body.Address, Medication:req.body.Medication, Diagnosis:req.body.Diagnosis, AdditionalInfo:req.body.AdditionalInfo };
        collection.insert(patientInfo, function(err, result) {
        if(err) { throw err; }
          db.close();
          res.send('Information Updated');   
      });
      });
    });

app.listen(3000, () => console.log('server is running'));
