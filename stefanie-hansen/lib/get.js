'use strict';
const fs = require('fs');

module.exports = function get(req, res) {
  let id = req.params.id;
  fs.readdir(__dirname + '/../data', (err, files) => {
    if (err) {
      console.log('Error reading directory', err);
      res.sendStatus(404);
      res.end();
    }
    else if (files.indexOf(`${id}.json`) > -1) {
      fs.readFile(__dirname + `/../data/${id}.json`, (err, data) => {
        if (err) {
          console.log('Error reading file', err);
          res.sendStatus(404);
          res.end();
        } else {
          console.log('data', data.toString())
          res.send(`You requested the contents of ${id}.json: \n${data.toString()}`);
          res.end();
        }
      });
    }
  });
};
