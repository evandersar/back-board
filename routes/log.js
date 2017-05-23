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
  let task_id = req.body.task;
 // let created = Date.now();

  //console.log('user_id = ', user_id);
  //console.log('task_id = ', task_id);
  //console.log('created = ', created);

  db.run("INSERT INTO log VALUES (NULL, ?, ?, strftime('%s','now'), NULL)", user_id, task_id, function (err) {

    if (err) {
      console.log(err);
      console.log('Cant insert data!');
      res.status(202).send({success: false, msg: 'Status logging failed!'});
    }
    else {
      console.log('Data inserted!');

      db.run("UPDATE user SET online = 1 WHERE id = ?", user_id, function (err) {
        if (err) {
          console.log(err);
          console.log('Cant set online status for user!');
        }
        else {
          console.log('User is online!');
        }
      });

      res.json({success: true, msg: 'Successful status logging!'});
    }
    res.end();
  });
});

module.exports = router;
