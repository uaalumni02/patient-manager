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

router.post('/login', (req, res, next) => {
    User.find({ user: req.body.user })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'auth failed'
                });

            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'auth failed'
                    });
                }
                if (result) {
                   var token = jwt.sign(
                       {
                        username:user[0].username,
                        userId:user[0]._id
                    },
                     process.env.JWT_KEY, 
                     {
                         expiresIn: '1h'
                     }
                    );
                    return res.status(200).json({
                        message: 'auth successful',
                        token:token
                    });
                }
                res.status(401).json({
                    message: 'auth failed'
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


//delete user
router.delete('/:id', (req, res) => {
    var id = req.params.id;
    User.findOneAndDelete({ '_id': id })
        .exec()
        .then(result => {
            res.status(200).json(result);

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});



module.exports = router;