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

//shows all data in the db

app.get('/api/allData', (req, res) => {
    mongoose.connect(DB_URL, function (err, db) {
        if (err) throw err;
        var collection = db.collection('patientInformation');
        db.collection('patientInformation').find({}).toArray(function (err, result) {
            if (err) throw err;
            return res.status(200)
                .json(result);
            db.close();
        });
    });

});

app.post('/api/add', (req, res) => {
    // Insert JSON straight into MongoDB
    mongoose.connect(DB_URL, function (err, db) {
        if (err) { throw err; }
        var collection = db.collection('patientInformation');
        var patientInfo = { Name: req.body.Name, Email: req.body.Email, Phone: req.body.Phone, Address: req.body.Address, Medication: req.body.Medication, Diagnosis: req.body.Diagnosis, AdditionalInfo: req.body.AdditionalInfo };
        collection.insert(patientInfo, function (err, result) {
            if (err) { throw err; }
            db.close();
            res.send('Information Added');
        });
    });
});

//remove docs from the db; based on name query /?q=

app.post('/api/remove', (req, res) => {
    mongoose.connect(DB_URL, function(err, db) {
        var query = req.query.q;
        if (err) throw err;
        var myquery = { Name: '' + query };
        db.collection("patientInformation").remove(myquery, function(err, obj) {
          if (err) throw err;
          console.log(obj.result.n + " document(s) deleted");
          db.close();
        });
      });
});

app.listen(3000, () => console.log('server is running'));
