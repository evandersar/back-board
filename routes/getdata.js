"use strict";
const express = require('express');
const router = express.Router();

//todo refactor db import
const sqlite3 = require('sqlite3').verbose();
const dbFile = './workforce.sqlite';
const db = new sqlite3.Database(dbFile);

let allData = {
  roles: null,
  teams: null,
  tasks: null
};

router.get('/', function (req, res, next) {

  db.all(`SELECT id, title FROM role WHERE id != 1`, function (err, rows) {

    if (err) {
      console.log(err);
      res.status(500);
    }
    else if (rows.length == 0) {
      console.log('No roles in database!');
      res.status(202).send({success: false, msg: 'No roles in database!'});
    }
    else {
      allData.roles = rows;
    }
  });


  db.all(`SELECT id, title, lead_id FROM team`, function (err, rows) {

    if (err) {
      console.log(err);
      res.status(500);
    }
    else if (rows.length == 0) {
      console.log('No teams in database!');
      res.status(202).send({success: false, msg: 'No teams in database!'});
    }
    else {
      allData.teams = rows;
    }
  });


  db.all(`SELECT id, title, spec_id FROM task`, function (err, rows) {

    if (err) {
      console.log(err);
      res.status(500);
    }
    else if (rows.length == 0) {
      console.log('No tasks in database!');
      res.status(202).send({success: false, msg: 'No tasks in database!'});
    }
    else {
      allData.tasks = rows;
      res.json({success: true, allData: allData});
    }
    res.end();
  });

});

module.exports = router;