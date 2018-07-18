'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _checkAuth = require('../middleware/check-auth');

var _checkAuth2 = _interopRequireDefault(_checkAuth);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _user3 = require('../controllers/user');

var _user4 = _interopRequireDefault(_user3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

//import model


// import controller


//create user
router.post('/', _user4.default.createUser);

//user login
router.post('/login', _user4.default.logIn);

//delete user
router.delete('/:id', _user4.default.remove_user);

module.exports = router;