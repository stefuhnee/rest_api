'use strict';
const fs = require('fs');

module.exports = function post(req, res) {
  let id = req.params.id;
  if (!req.body) {
    res.sendStatus(400);
    res.end();
  } else {
    fs.writeFile(__dirname + `/../data/${id}.json`, JSON.stringify(req.body), (err) => {
      if (err) console.log(err);
      res.send(`Received request and wrote file ${id}.json with the following contents: \n${JSON.stringify(req.body)}`);
      res.end();
    });
  }
};
