'use strict';

const app = require('express')();
const bodyParser = require('body-parser').json();
const mongoose = require('mongoose');
const morgan = require('morgan');
const plantRouter = require('./route/plant-routes');
const supplementRouter = require('./route/supplement-routes');
const authRouter = require('./route/auth-routes');

const dbPort = process.env.MONGOLAB_URI || 'mongodb://localhost/dev_db';
mongoose.connect(dbPort);

app.use(morgan('dev'));

app.use(bodyParser);

app.use('/plants', plantRouter);

app.use('/supplements', supplementRouter);

app.use('/', authRouter);

app.all('*', (req, res) => {
  res.status(404).json({Message:'Not Found'});
});

app.use((err, req, res, next) => {
  res.send('Error');
});

app.listen(3000, () => {
  console.log('listening on 3000');
});
