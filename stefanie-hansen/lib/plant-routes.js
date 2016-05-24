'use strict';

const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/:id', (req, res) => {
  let id = req.params.id;
  fs.readdir(__dirname + '/../data', (err, files) => {
    if (err) {
      console.log('Error reading directory', err);
      res.sendStatus(404);
      res.end('Error: Cannot read file directory');
    }
    else if (files.indexOf(`${id}.json`) > -1) {
      fs.readFile(__dirname + `/../data/${id}.json`, (err, data) => {
        if (err) {
          console.log('Error reading file', err);
          res.sendStatus(404);
          res.end('Error: Cannot read file');
        } else {
          res.send(`You requested the contents of ${id}.json: \n${data.toString()}`);
          res.end();
        }
      });
    }
  });
});

router.post('/:id', (req, res) => {
  let id = req.params.id;
  if (!req.body) {
    res.sendStatus(400);
    res.send('Error: No body sent with request');
    res.end();
  } else {
    fs.writeFile(__dirname + `/../data/${id}.json`, JSON.stringify(req.body), (err) => {
      if (err) console.log(err);
      res.send(`Received request and wrote file ${id}.json with the following contents: \n${JSON.stringify(req.body)}`);
      res.end();
    });
  }
});

router.put('/:id', (req, res) => {
  let id = req.params.id;
  if (!req.body) {
    res.sendStatus(400);
    res.send('Error: No body sent with request');
    res.end();
  } else {
    fs.writeFile(__dirname + `/../data/${id}.json`, JSON.stringify(req.body), (err) => {
      if (err) console.log(err);
      res.send(`Received request and wrote file ${id}.json with the following contents: \n${JSON.stringify(req.body)}`);
      res.end();
    });
  }
});

router.delete('/:id', (req, res) => {
  let id = req.params.id;
  fs.unlink(__dirname + `/../data/${id}.json`, (err) => {
    if (err) {
      console.log('Error deleting file', err);
      res.sendStatus(404);
      res.end('Error: Cannot delete file');
    } else {
      res.send(`File ${id}.json successfully deleted`);
      res.end();
    }
  });
});

module.exports = router;
