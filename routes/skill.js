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

let allData = {
  skills: null,
  logs: null
};

router.post('/', function (req, res, next) {
  //console.log(req.body);

  let user_id = jwt.decode(req.body.token, secret).split(';')[0];

  console.log('user_id = ', user_id);

  db.all("SELECT task.title, task.id FROM task JOIN skill WHERE task.id = skill.task_id AND skill.user_id = ? ORDER BY task.id",
    user_id, function (err, rows) {
    //console.log(rows);

    if (err) {
      console.log(err);
      res.status(500);
    }
    else if (rows.length == 0) {
      console.log('No skills in employee profile!');
      res.status(202).send({
        success: false,
        msg: 'You don`t have any skills, please contact your SV or administrator!'
      });
    }
    else {
      allData.skills = rows;
      //res.json({success: true, skills: rows});
    }
    //res.end();
  });

  db.all(`SELECT log.task_id, log.created_at, task.title 
  FROM log
  JOIN task ON log.task_id = task.id
  WHERE log.user_id = ? AND datetime(log.created_at, 'unixepoch', 'localtime') >= date('now', 'start of day', 'localtime')`,
    user_id, function (err, rows) {

    if (err) {
      console.log(err);
      res.status(500);
    }
    else if (rows.length == 0) {
      console.log('No user logs for today!');
      allData.logs = [];
      res.json({success: true, allData: allData});
    }
    else {
      allData.logs = rows;
      res.json({success: true, allData: allData});
    }
    res.end();
  });

});

module.exports = router;
