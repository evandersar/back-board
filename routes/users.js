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

router.get('/', function (req, res, next) {

  db.all(`SELECT id, first_name, last_name, role, team, active FROM user WHERE role != 1`, function (err, rows) {

    if (err) {
      console.log(err);
      res.status(500);
    }
    else if (rows.length == 0) {
      console.log('No users in database!');
      res.status(202).send({success: false, msg: 'No users in database!'});
    }
    else {
      res.json({success: true, users: rows});
    }
    res.end();
  });
});

module.exports = router;
