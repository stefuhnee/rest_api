'use strict';

const express = require('express');
const bodyParser = require('body-parser').json();
const basicAuth = require('../lib/basic-auth.js');
const User = require('../model/user');
const router = module.exports = express.Router();

router.get('/signin', basicAuth, (req, res, next) => {
  let username = req.auth.username;
  User.findOne({username}, (err, user) => {
    if (err || !user) return next(new Error('Cannot find user'));
    if (!user.comparePassword(req.auth.password)) {
      return next(new Error('Invalid password'));
    }
    return res.json({token: user.generateToken()});
  });
});
