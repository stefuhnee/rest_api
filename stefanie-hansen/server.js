'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const plantRouter = require('./lib/plant-routes');

app.use(jsonParser);
app.use('/plants', plantRouter);

app.all('*', (req, res) => {
  res.sendStatus(404);
  res.end();
});

app.listen(3000, () => {
  console.log('listening on 3000');
});
