import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import checkAuth from '../middleware/check-auth';

//import model
import User from '../models/user';
// import controller
import userController from '../controllers/user';

const router = express.Router();

//create user
router.post('/', userController.createUser);
//user login
router.post('/login', userController.logIn);
//delete user
router.delete('/:id', userController.removeUser);

export default router;