var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var app = express();


mongoose.connect('mongodb://localhost/patientmanager');
var db = mongoose.connectionn;

app.get('/', (req, res) => {
res.send('Please use routes for application access');
});




app.listen(3000, () => console.log('server is running'));
