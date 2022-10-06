
const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('combined'));

module.exports = app;
