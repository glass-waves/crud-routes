const express = require('express');
const sendEmailTo = require('./utils/amazon');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1/todos', require('./controllers/todos'));
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;

