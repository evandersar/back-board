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

  db.get("SELECT id, first_name, last_name, role FROM user WHERE email = ? AND password = ? AND active = ?",
        req.body.mail, req.body.password, 1, function (err, row) {
    //console.log(row);
    if (err) {
      console.log(err);
      res.status(500);
    }
    else if (!row) {
      console.log('Wrong email/password or no such user!');
      res.status(202).send({success: false, msg: 'Wrong email/password or no such user!'});
    }
    else {
      //console.log(row.id, row.first_name, row.last_name, row.role);

      let payload = `${row.id};${row.role};${row.first_name};${row.last_name}`;

      console.log("payload = ", payload);

      let token = jwt.encode(payload, secret);
      res.json({success: true, token: token, role: row.role});
    }
    res.end();
  });
});

module.exports = router;
