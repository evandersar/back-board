"use strict";
const express = require('express');
const router = express.Router();

//todo refactor db import
const sqlite3 = require('sqlite3').verbose();
const dbFile = './workforce.sqlite';
const db = new sqlite3.Database(dbFile);

router.put('/', function (req, res, next) {

  //console.log('req.body: ', req.body);

  let user = JSON.parse(req.body.user);
  let sv_id = user.id;

  //console.log('user:', user);

  db.run("UPDATE user SET first_name = ?, last_name = ?, email = ?, password = ? WHERE id = ? ",
    user.f_name, user.l_name, user.email, user.password, sv_id, function (err) {

    if (err) {
      console.log(err);
      console.log('User update failed!');
      res.status(202).send({success: false, msg: 'User update failed!'});
    }
    else {
      console.log('Successful user update!');
      res.json({success: true, msg: 'Successful user update!'});
    }
    res.end();

  });

});

module.exports = router;
