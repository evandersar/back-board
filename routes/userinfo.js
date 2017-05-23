"use strict";
const express = require('express');
const router = express.Router();

//todo refactor db import
const sqlite3 = require('sqlite3').verbose();
const dbFile = './workforce.sqlite';
const db = new sqlite3.Database(dbFile);

let allData = {
  data: null,
  skills: null
};

router.post('/', function (req, res, next) {
  console.log(req.body);

  let user_id = req.body.user_id;

  db.get("SELECT id, first_name, last_name, email, password, team FROM user WHERE (id = ?)", user_id, function (err, row) {
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
      //res.json({success: true, data: row});
      allData.data = row;
      // console.log('allData after select', allData);

      db.all("SELECT task.title, task.id FROM task JOIN skill WHERE task.id = skill.task_id AND skill.user_id = ? ORDER BY task.id",
              user_id, function (err, rows) {

        //console.log(rows);

        if (err) {
          console.log(err);
          res.status(500);
        }
        else if (rows.length == 0) {
          console.log('No skills in employee profile!');
          allData.skills = [];
          // console.log('allData while no skills', allData);
          res.status(202).send({
            success: false,
            msg: 'No skills in employee profile!',
            allData: allData
          });
          res.end();
        }
        else {
          allData.skills = rows;
          // console.log('allData before response', allData);
          res.json({success: true, allData: allData});
          res.end();
          allData = {
            data: null,
            skills: null
          };
        }

      });
    }
  });


});

module.exports = router;
