'use strict';

const express = require('express');
const router = express.Router();
const get = require('./get');
const post = require('./post');
const put = require('./put');
const del = require('./delete');

router.route('/:id')
  .get(get)
  .put(put)
  .post(post)
  .delete(del);

module.exports = router;
