'use strict';
const fs = require('fs');

module.exports = function del(req, res) {
  let id = req.params.id;
  fs.unlink(__dirname + `/../data/${id}.json`, (err) => {
    if (err) {
      console.log('Error deleting file', err);
      res.sendStatus(404);
      res.end();
    } else {
      res.send(`File ${id}.json successfully deleted`);
      res.end();
    }
  });
};
