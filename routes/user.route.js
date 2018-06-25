var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const router = express.Router();

//request model
var User = require('../models/user');

// import controller
var userController = require('../controllers/user');

//create user
router.post('/', userController.createUser);

//user login
router.post('/login', userController.logIn);

//delete user
router.delete('/:id', userController.remove_user);


module.exports = router;