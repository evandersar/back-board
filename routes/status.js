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
  users: [],
  statistics: []
};

router.get('/', function (req, res, next) {
//console.log(req.body);

  db.all(`SELECT log.user_id, log.task_id AS o_task_id, task.title AS o_status, user.first_name, user.last_name, team.title AS team
            FROM log 
            JOIN task ON log.task_id = task.id 
            JOIN user ON log.user_id = user.id
            JOIN team ON user.team = team.id
            WHERE (user.online = 1 AND user.active = 1)
            GROUP BY log.user_id`, function (err, rows) {

    //console.log(rows);

    if (err) {
      console.log(err);
      res.status(500);
    }
    else if (rows.length == 0) {
      console.log('No users online!');
      res.status(202).send({success: false, msg: 'No users online!'});
    }
    else {
      //res.json({success: true, skills: rows});
      allData.users = rows;

      db.all(`SELECT log.user_id, log.task_id AS w_task_id, task.title AS w_status, user.first_name, user.last_name, team.title AS team
            FROM log 
            JOIN task ON log.task_id = task.id 
            JOIN user ON log.user_id = user.id
            JOIN team ON user.team = team.id
            WHERE (user.online = 1 AND user.active = 1) AND (log.task_id != 1 AND log.task_id != 2 AND log.task_id != 3)
            GROUP BY log.user_id`, function (err, rows) {

        //console.log(rows);

        if (err) {
          console.log(err);
          res.status(500);
        }
        else if (rows.length == 0) {
          console.log('No working users statuses!');
          res.status(202).send({success: false, msg: 'No working users statuses!', allData: allData});
        }
        else {

          for (let user of allData.users) {
            for (let skill of rows) {
              if (user.user_id == skill.user_id) {
                user['w_task_id'] = skill.w_task_id;
                user['w_status'] = skill.w_status;
              }
            }
          }

          db.all(`SELECT task_id, w_status as status, COUNT(task_id) as counts FROM (SELECT log.user_id, log.task_id, task.title AS w_status
                  FROM log
                  JOIN task ON log.task_id = task.id
                  JOIN user ON log.user_id = user.id
                  WHERE (user.online = 1 AND user.active = 1) AND (log.task_id != 1 AND log.task_id != 2 AND log.task_id != 3)
                  GROUP BY log.user_id)
                  GROUP BY w_status`, function (err, rows) {

            //console.log(rows);

            if (err) {
              console.log(err);
              res.status(500);
            }
            else {
              allData.statistics = rows;

              res.json({success: true, allData: allData});

              allData = {
                users: [],
                statistics: []
              };
            }
            res.end();
          });
        }
      });
    }
  });
});

module.exports = router;
