'use strict';

const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/:id', (req, res) => {
  let id = req.params.id;
  res.send(`Get received for path ${id}`);
});

router.post('/:id', (req, res) => {
  let id = req.params.id;
  if (req.body) {
    fs.writeFile(__dirname + `/../data/${id}.json`, JSON.stringify(req.body), (err) => {
      if (err) console.log(err);
      return res.send('File received');
    });
  }
  res.end('No body');
});

router.put('/:id', (req, res) => {
  res.send(`Put received for path ${id}`);
  let id = req.params.id;
});

router.delete('/:id', (req, res) => {
  res.send(`Delete received for path ${id}`);
  let id = req.params.id;
});

module.exports = router;
