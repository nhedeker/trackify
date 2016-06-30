'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt');

const checkAuth = function(req, res, next) {
  if (!req.session.user) {
    return res.sendStatus(401);
  }

  next();
}

router.post('/users', (req, res, next) => {
  // 1st arg: what we want to hash
  // 2nd arg: work factor
  // 3rd arg: callback
  // 1st arg call: error if error
  // 2nd arg call: the resulting hashed thing
  bcrypt.hash(req.body.password, 12, (hashErr, hashed_password) => {
    if (hashErr) {
      return next(hashErr);
    }

    knex('users')
      .insert({
        email: req.body.email,
        hashed_password: hashed_password
      }, '*')
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        next(err);
      });
  });
});

// User follows an artist
router.post('/users/artists/:artistId', checkAuth, (req, res, next) => {
  const userId = req.session.user.id;
  const artistId = Number.parseInt(req.params.artistId);

  knex('users_artists')
    .insert({
      user_id: userId,
      artist_id: artistId
    }, '*')
    .then((results) => {
      res.send(results[0]);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/users/artists', checkAuth, (req, res, next) => {
  const userId = req.session.user.id;

  knex('artists')
    .innerJoin('users_artists', 'users_artists.artist_id', 'artists.id')
    .where('users_artists.user_id', userId)
    .then((artists) => {
      res.send(artists);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
