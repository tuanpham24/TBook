
const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('combined')); // HTTP logger

app.use(express.json());

module.exports = app;
