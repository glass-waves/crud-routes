const express = require('express');
const sendEmailTo = require('./utils/amazon');
const app = express();

app.use(express.json());

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;

