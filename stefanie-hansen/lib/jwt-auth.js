'use strict';

const jwt = require('jsonwebtoken');
const User = require('../model/user');
const secret = process.env.SECRET || 'testPass';

module.exports = function(req, res, next) {
  let token = req.headers.token || req.body.token;
  if (!token) {
    console.log('no token');
    return next(new Error('No token provided'));
  }

  try {
    token = jwt.verify(token, secret);
  } catch(err) {
    console.log('invalid token');
    console.log(err);
    return next(new Error('Invalid token'));
  }

  User.findOne({_id: token}, (err, user) => {
    if (err) {
      console.log('cannot find user');
      return next(new Error('Cannot find user'));
    }
    req.user = user;
    next();
  });
};
