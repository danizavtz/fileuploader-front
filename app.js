require('dotenv').config()
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const expressJwt = require('express-jwt');
const expressValidator = require('express-validator');

const app = express();
app.disable('x-powered-by');
app.use('/secure', expressJwt({ secret: process.env.SECRET }));
cors({ credentials: true, origin: true });
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressValidator());

app.locals.title = "Login App";
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}

app.use('/', require('./server/index'));

module.exports = app;