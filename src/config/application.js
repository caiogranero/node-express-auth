const express = require('express');

const app = express();
const environment = require('./environment');
const consign = require('consign');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const config = environment.getSetup('development');
mongoose.connect(config.db.uri);
mongoose.Promise = global.Promise;

app.set('superSecret', config.application.secret);
app.use(cookieParser());
app.use(helmet());
app.use(cors());

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

let routes = './routes';

// to consign, routes path change when run the test from main folder.
// This happens just in test enviroment
if (process.env.NODE_ENV === 'test') {
  routes = './src/routes';
}

consign()
  .include(routes)
  .into(app);

module.exports = app;
