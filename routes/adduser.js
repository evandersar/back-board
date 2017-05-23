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

  //console.log('req.body: ', req.body);

  let sender_role = jwt.decode(req.body.token, secret).split(';')[1];
  let user = JSON.parse(req.body.user);

  let maxUserId;

  //console.log('user.role:', user.role);
  //console.log('user:', user);

// sender_role == 1 --> data sent by admin
  if (sender_role == 1) {
    if (user.role == 2) {
      db.run("INSERT INTO user VALUES (NULL, ?, ?, ?, ?, ?, 0, 0, 1 )",
        user.f_name, user.l_name, user.email, user.password, user.role, function (err) {

        if (err) {
          console.log(err);
          console.log('Adding user failed!');
          res.status(202).send({success: false, msg: 'Adding user failed!'});
        }
        else {
          console.log('Data inserted!');
          res.json({success: true, msg: 'Successful user added'});
        }
        res.end();
      });
    } else if (user.role == 3) {

      let tasks = user.skill_set;

      //console.log(tasks);

      db.run("INSERT INTO user VALUES (NULL, ?, ?, ?, ?, ?, ?, 0, 1 )",
        user.f_name, user.l_name, user.email, user.password, user.role, user.team, function (err) {

        if (err) {
          console.log(err);
          console.log('Adding user failed!');
          res.status(202).send({success: false, msg: 'Adding user failed!'});
        }
        else {
          console.log('Data inserted into users table!');
          //res.json({success: true, msg: 'Successful user added'});
        }
        //res.end();
      });

      db.get("SELECT MAX(id) as maxId FROM user", function (err, row) {
        //console.log(row);
        if (err) {
          console.log(err);
          res.status(500);
        }
        else if (!row) {
          console.log('Cant get id of last added user!');
          res.status(202).send({success: false, msg: 'Cant get id of last added user!'});
        }
        else {

          //console.log('row.maxId => ', row.maxId);
          maxUserId = row.maxId;

          //todo handle error
          db.serialize(function () {
            let skillz = db.prepare("INSERT INTO skill VALUES (?, ?)");

            for (let i = 0; i < tasks.length; i++) {
              skillz.run(maxUserId, tasks[i]);
            }
            skillz.finalize();
          });

          console.log('Data inserted into skills table!');

          res.json({success: true, msg: 'Successful user added'});
          res.end();

        }
      });
    }
  }

});

module.exports = router;
