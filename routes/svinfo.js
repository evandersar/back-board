"use strict";
const express = require('express');
const router = express.Router();

//todo refactor db import
const sqlite3 = require('sqlite3').verbose();
const dbFile = './workforce.sqlite';
const db = new sqlite3.Database(dbFile);

router.post('/', function (req, res, next) {
  //console.log(req.body);

  db.get("SELECT id, first_name, last_name, email, password FROM user WHERE (id = ?)", req.body.user_id, function (err, row) {
    //console.log(row);
    if (err) {
      console.log(err);
      res.status(500);
    }
    else if (!row) {
      console.log('No user with such id!');
      res.status(202).send({success: false, msg: 'No user with such id!'});
    }
    else {
      //console.log(row);
      res.json({success: true, data: row});
    }
    res.end();
  });

});

module.exports = router;
