'use strict';

const express = require('express');
const path = require('path');
const port = process.env.PORT || 8000;

const morgan = require('morgan');
const bodyParser = require('body-parser');

const artists = require('./routes/artists');
const tracks = require('./routes/tracks');
const users = require('./routes/users');
const session = require('./routes/session');

const app = express();

app.disable('x-powered-by');

app.use(morgan('short'));
app.use(bodyParser.json());

app.use(users);
app.use(artists);
app.use(tracks);
app.use(session);

app.use((_req, res) => {
  res.sendStatus(404);
});

app.use((err, _req, res, next) => {
  console.error(err.stack);
  res.sendStatus(500);
});

app.listen(port, () => {
  console.log('Listening on port', port);
})

module.exports = app;
