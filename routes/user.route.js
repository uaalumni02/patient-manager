import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import checkAuth from '../middleware/check-auth';

const router = express.Router();

//import model
import User from '../models/user';

// import controller
import userController from '../controllers/user';

//create user
router.post('/', userController.createUser);

//user login
router.post('/login', userController.logIn);

//delete user
router.delete('/:id', userController.remove_user);


module.exports = router;