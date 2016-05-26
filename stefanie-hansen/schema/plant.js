'use strict';

const mongoose = require('mongoose');

const Plant = mongoose.Schema({
  commonName: {type: String, required: true},
  scientificName: {type: String, required: true},
  medicinalUses: {type: String, required: true},
  zone: {type: Number, required: true}
});

module.exports = mongoose.model('plant', Plant);
