'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _patient = require('./models/patient');

var _patient2 = _interopRequireDefault(_patient);

var _appointment = require('./models/appointment');

var _appointment2 = _interopRequireDefault(_appointment);

var _user = require('./models/user');

var _user2 = _interopRequireDefault(_user);

var _patient3 = require('./routes/patient.route');

var _patient4 = _interopRequireDefault(_patient3);

var _appointment3 = require('./routes/appointment.route');

var _appointment4 = _interopRequireDefault(_appointment3);

var _user3 = require('./routes/user.route');

var _user4 = _interopRequireDefault(_user3);

var _patient5 = require('./controllers/patient');

var _patient6 = _interopRequireDefault(_patient5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var app = (0, _express2.default)();

//import models

//import routes

var DB_URL = process.env.MONGO_URL;

// Connect to mongoose
_mongoose2.default.connect(DB_URL, function (err) {
    if (err) return console.log('Unable to Connect to MongoDB');
    return console.log('Connection Successful');
});

//middleware to parse request body

app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: true }));

//middleware to utilize routes
app.use('/api/patient', _patient4.default);
app.use('/api/appointment', _appointment4.default);
app.use('/api/user', _user4.default);
app.use('/api/patient', _patient6.default);

app.get('/', function (req, res) {
    res.send('Please use routes for application access');
});

app.listen(3000, function () {
    return console.log('server is running');
});