'use strict';

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Supplement = mongoose.Schema({
  name: {type: String, required: true},
  medicinalEffects: {type: Array, required: true},
  sideEffects: {type: Array, required: false}
});

module.exports = mongoose.model('supplement', Supplement);
