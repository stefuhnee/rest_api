'use strict';

const mongoose = require('mongoose');

const Plant = mongoose.Schema({
  commonName: {type: String, required: true},
  scientificName: {type: String, required: true},
  medicinalUses: {type: Array, required: true},
  nutritionalValue: {type: Array, required: true},
  zone: {type: Number, required: true}
});

module.exports = mongoose.model('plant', Plant);
