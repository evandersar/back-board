"use strict";
const express = require('express');
const router = express.Router();

const jwt = require('jwt-simple');
// const secret = require('../token/secret');
const secret = 'some_Very_SECRET_secret';

//todo refactor db import
const sqlite3 = require('sqlite3').verbose();
const dbFile = './workforce.sqlite';
const db = new sqlite3.Database(dbFile);

router.post('/', function (req, res, next) {
  //console.log(req.body);

  let user_id = jwt.decode(req.body.token, secret).split(';')[0];

  console.log('user_id = ', user_id);

  db.run("UPDATE user SET online = 0 WHERE id = ?", user_id, function (err) {

    if (err) {
      console.log(err);
      console.log('Cant set offline status for user!');
      res.json({success: false, msg: 'Cant set offline status for user!'});
    }
    else {
      res.json({success: true, msg: 'Now user is offline!'});
    }
    res.end();
  });
});

module.exports = router;
