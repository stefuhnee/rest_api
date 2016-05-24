'use strict';

const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/:id', (req, res) => {
  let id = req.params.id;
  fs.readdir(__dirname + '/../data', (err, files) => {
    if (err) {
      console.log('Error reading directory', err);
      res.end('Error: Cannot read directory');
    }
    if (files.indexOf(`${id}.json`) > -1) {
      fs.readFile(__dirname + `/../data/${id}.json`, (err, data) => {
        if (err) {
          console.log('Error reading file', err);
          res.end('Error: Cannot read file');
        }
        res.send(`You requested ${id}.json: `, data.toString());
        res.end();
      });
    }
  });
});

router.post('/:id', (req, res) => {
  let id = req.params.id;
  if (!req.body) {
    res.send('Error: No body sent with request');
    res.end();
  }
  fs.writeFile(__dirname + `/../data/${id}.json`, JSON.stringify(req.body), (err) => {
    if (err) console.log(err);
    res.send('received');
    res.end();
  });
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
