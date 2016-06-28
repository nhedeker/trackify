'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/artists', (_req, res, next) => {
  knex('artists')
    .orderBy('id')
    .then((artists) => {
      res.send(artists);
    })
    .catch((err) => {
      next(err);
    })
});

router.get('/artsists/:id', (req, res, next) => {
  knex('artists')
    .where('id', req.params.id)
    .first()
    .then((artist) => {
      if (!artist) {
        return next();
      }
      res.send(artist);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
