'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt');

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

module.exports = router;
