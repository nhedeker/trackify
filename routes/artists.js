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
    });
});

router.get('/artists/:id', (req, res, next) => {
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

// for creation
router.post('/artists', (req, res, next) => {
  knex('artists')
    .insert(req.body, '*')
    .then((results) => {
      res.send(results[0]);
    })
    .catch((err) => {
      next(err);
    });
});

//for updating
router.patch('/artists/:id', (req, res, next) => {
  knex('artists')
    .where('id', req.params.id)
    .first()
    .then((artist) => {
      if (!artist) {
        return next();
      }

      return knex('artists')
        .update(req.body, '*')
        .where('id', req.params.id)
        .then((results) => {
          res.send(results[0]);
        });
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/artists/:id', (req, res, next) => {
  knex('artists')
    .where('id', req.params.id)
    .first()
    .then((artist) => {
      if (!artist) {
        return next();
      }
      // if you return a promise you can continue chaining it below
      // hence why you don't need two catch statments for each promise
      return knex('artists')
        .del()
        .where('id', req.params.id)
        // del doesn't return anything so needed to grab artist from earlier
        .then(() => {
          delete artist.id;
          res.send(artist);
        });
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/artists/:id/tracks', (req, res, next) => {
  knex('tracks')
    .where('artist_id', req.params.id)
    .orderBy('id')
    .then((track) => {
      res.send(track);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
