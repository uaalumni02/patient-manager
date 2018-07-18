'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _checkAuth = require('../middleware/check-auth');

var _checkAuth2 = _interopRequireDefault(_checkAuth);

var _patient = require('../models/patient');

var _patient2 = _interopRequireDefault(_patient);

var _patient3 = require('../controllers/patient');

var _patient4 = _interopRequireDefault(_patient3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var router = _express2.default.Router();

//import model


// import controller


//shows all data
router.get('/', _checkAuth2.default, _patient4.default.get_all_patients);

// Insert JSON straight into MongoDB
router.post('/', _checkAuth2.default, _patient4.default.add_patients);

//search DB by id
router.get('/:id', _checkAuth2.default, _patient4.default.search_patients);

//remove patient from the db
router.delete('/:id', _checkAuth2.default, _patient4.default.remove_patient);

//update patient information
router.patch('/:id', _checkAuth2.default, _patient4.default.update_patient);

module.exports = router;