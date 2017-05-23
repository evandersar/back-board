"use strict";
const express = require('express');
const router = express.Router();

//todo refactor db import
const sqlite3 = require('sqlite3').verbose();
const dbFile = './workforce.sqlite';
const db = new sqlite3.Database(dbFile);

db.exec('PRAGMA foreign_keys = ON');

router.put('/:user_id', function (req, res, next) {
  console.log('req.params.user_id => ', req.params.user_id);

  let [, user_id, user_state] = req.params.user_id.split(':');

  db.run("UPDATE user SET active = ? WHERE id = ? ", user_state, user_id, function (err) {
    if (err) {
      console.log(err);
      console.log("User's state changing failed!");
      res.status(202).send({success: false, msg: "User's state changing failed!"});
    }
    else {
      console.log("User's state changed!");
      res.json({success: true, msg: "User's state changed!"});
    }
    res.end();
  });

});

module.exports = router;