
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

// app.use(morgan('dev')); // HTTP logger
app.use(morgan('combined')); // HTTP logger

app.use(cors());

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.json());    


module.exports = app;
