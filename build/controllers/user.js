'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

//import model


//create user
router.createUser = ('/', function (req, res, next) {
    _user2.default.find({ username: req.body.username }).exec().then(function (user) {
        if (user.length >= 1) {
            return res.status(409).json({
                message: 'user name exist'
            });
        } else {
            _bcrypt2.default.hash(req.body.password, 10, function (err, hash) {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {}
                var user = new _user2.default({
                    _id: new _mongoose2.default.Types.ObjectId(),
                    username: req.body.username,
                    password: hash
                });
                user.save().then(function (result) {
                    console.log(result);
                    res.status(201).json({
                        message: 'User Created'
                    });
                }).catch(function (err) {
                    console.log(err);
                    res.status(500).json({
                        error: err

                    });
                });
            });
        }
    });
});

//user login
router.logIn = ('/login', function (req, res, next) {
    _user2.default.find({ username: req.body.username }).exec().then(function (user) {
        if (user.length < 1) {
            return res.status(401).json({
                message: 'auth failed'
            });
        }
        _bcrypt2.default.hash(req.body.password, user[0].password, function (err, result) {
            if (err) {
                return res.status(401).json({
                    message: 'auth failed'
                });
            }
            if (result) {
                var token = _jsonwebtoken2.default.sign({
                    username: user[0].username,
                    userId: user[0]._id
                }, process.env.JWT_KEY, {
                    expiresIn: '365d'
                });
                return res.status(200).json({
                    message: 'auth successful',
                    token: token
                });
            }
            res.status(401).json({
                message: 'auth failed'
            });
        });
    }).catch(function (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

//delete user
router.remove_user = ('/:id', function (req, res) {
    var id = req.params.id;
    _user2.default.findOneAndDelete({ '_id': id }).exec().then(function (result) {
        res.status(200).json(result);
    }).catch(function (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;