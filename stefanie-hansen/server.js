'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const plantRouter = require('./lib/plant-routes');
const supplementRouter = require('./lib/supplement-routes')
const mongoose = require('mongoose');
const morgan = require('morgan');

mongoose.connect('mongodb://localhost/dev_db');

app.use(morgan('dev'));
app.use(jsonParser);
app.use('/plants', plantRouter);
app.use('supplements', supplementRouter)

app.use((err, req, res, next) => {
  res.send('Error: ', err.message);
});

app.all('*', (req, res) => {
  res.sendStatus(404);
});

app.listen(3000, () => {
  console.log('listening on 3000');
});
