'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const plantRouter = require('./plant-routes');

app.use(jsonParser);
app.use('/plants', plantRouter);

app.listen(3000, () => {
  console.log('listening on 3000');
});
