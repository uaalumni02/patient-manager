'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _checkAuth = require('../middleware/check-auth');

var _checkAuth2 = _interopRequireDefault(_checkAuth);

var _appointment = require('../models/appointment');

var _appointment2 = _interopRequireDefault(_appointment);

var _appointment3 = require('../controllers/appointment');

var _appointment4 = _interopRequireDefault(_appointment3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

//request model


// import controller


//add appt data to db
router.post('/', _checkAuth2.default, _appointment4.default.add_appointment);

//show all appts
router.get('/', _checkAuth2.default, _appointment4.default.all_appointments);

//update appointment info
router.patch('/:id', _checkAuth2.default, _appointment4.default.update_appointment_info);

//delete appt from the DB
router.delete('/:id', _checkAuth2.default, _appointment4.default.remove_appointment);

//search appt by ID
router.get('/:id', _checkAuth2.default, _appointment4.default.search_appointment);

module.exports = router;