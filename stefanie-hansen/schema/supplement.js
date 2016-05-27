'use strict';

const mongoose = require('mongoose');

const Supplement = mongoose.Schema({
  name: {type: String, required: true},
  medicinalEffects: {type: Array, required: true},
  sideEffects: Array
});

module.exports = mongoose.model('supplement', Supplement);
