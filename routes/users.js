'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/users', (req, res, next) => {
  // 1st arg: what we want to hash
  // 2nd arg: work factor
  // 3rd arg: callback
  // 1st arg call: error if error
  // 2nd arg call: the resulting hashed thing
  bcrypt.hash(req.body.password, 12, (err, hashed_password) => {
    if (err) {
      return next(err);
    }
    console.log(req.body.email, hashed_password);
    res.sendStatus(200);
  });
});

module.exports = router;
