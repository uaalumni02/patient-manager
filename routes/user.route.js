var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var checkAuth = require('../middleware/check-auth');

const router = express.Router();

//request model
var User = require('../models/user');

// import controller
var userController = require('../controllers/user');

//create user
router.post('/', checkAuth, userController.createUser);

//user login
router.post('/login', checkAuth, userController.logIn);

//delete user
router.delete('/:id', checkAuth, userController.remove_user);


module.exports = router;