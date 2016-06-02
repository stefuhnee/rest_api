'use strict';

const app = require('express')();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const mongoose = require('mongoose');
const morgan = require('morgan');
const plantRouter = require('./routes/plant-routes');
const supplementRouter = require('./routes/supplement-routes');
const authRouter = require('./routes/auth-routes');

const dbPort = process.env.MONGOLAB_URI || 'mongodb://localhost/dev_db';
mongoose.connect(dbPort);

app.use(morgan('dev'));

app.use(jsonParser);

app.use('/plants', plantRouter);

app.use('/supplements', supplementRouter);

app.use('/', authRouter);

app.use((err, req, res, next) => {
  res.send('Error: ', err.message);
  next(err);
});

app.all('*', (req, res) => {
  res.sendStatus(404);
});

app.listen(3000, () => {
  console.log('listening on 3000');
});
