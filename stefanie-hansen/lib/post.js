'use strict';
const fs = require('fs');

module.exports = function post(req, res) {
  let id = req.params.id;
  if (!req.body) {
    res.sendStatus(400);
    res.end();
  } else {
    // Does file exist already?
    fs.readFile(__dirname + `/../data/${id}.json`, (err) => {
      // If no files exists, write one.
      if (err) {
        fs.writeFile(__dirname + `/../data/${id}.json`, JSON.stringify(req.body), (err) => {
          if (err) {
            console.log(err);
            res.sendStatus(404);
            res.send();
          } else {
            res.send(`Received request and wrote file ${id}.json with the following contents: \n${JSON.stringify(req.body)}`);
            res.end();
          }
        });
        // If file already exists, don't overwrite and send back a bad request.
      } else {
        res.sendStatus(400);
        res.end();
      }
    });
  }
};
