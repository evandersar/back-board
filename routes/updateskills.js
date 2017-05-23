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
  let user_id = user.id;
  let tasks = user.skill_set;

  //console.log('user:', user);


  db.run("DELETE FROM skill WHERE user_id = (?)", user_id, function (err) {
    if (err) {
      console.log(err);
      console.log('Removing of user skills failed!');
      res.status(202).send({success: false, msg: 'Removing of user skills failed!'});
    }
    else {
      console.log('User skills successfully removed from DB!');
      //res.json({success: true, msg: 'User skills successfully removed from DB!'});

      //todo handle error
      db.serialize(function () {
        let skillz = db.prepare("INSERT INTO skill VALUES (?, ?)");

        for (let i = 0; i < tasks.length; i++) {
          skillz.run(user_id, tasks[i]);
        }
        skillz.finalize();
      });

      console.log('Data inserted into skills table!');

      res.json({success: true, msg: 'Successful user update!'});
      res.end();
    }
    //res.end();
  });

});

module.exports = router;
