var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

const router = express.Router();

//request model
var User = require('../models/user');


//create user
router.post('/', (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        } else {
            var user = new User({
                _id: new mongoose.Types.ObjectId(),
                username: req.body.username,
                password: hash
            });
            user
                .save()
                .then(result => {
                    console.log(result)
                    res.status(201).json({
                        message: 'User Created',
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err

                    });
                });
        }
    });
});



module.exports = router;