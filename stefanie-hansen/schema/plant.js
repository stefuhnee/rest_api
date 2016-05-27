'use strict';

const mongoose = require('mongoose');

const Uses = mongoose.Schema({
  medicinal: Array,
  nutritional: Array
});

const Plant = mongoose.Schema({
  commonName: {type: String, required: true},
  scientificName: {type: String, required: true},
  uses: [Uses],
  zone: {type: Number, required: true}
});

module.exports = mongoose.model('plant', Plant);
